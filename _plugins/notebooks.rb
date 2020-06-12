# ------------------------------------------------------------------------------
# ~/_plugins/notebooks.rb
# Jekyll generator for J1 Notebooks to build HTML code for 
# all Jupyter Notebooks configured
#
# Product/Info:
# http://jekyll.one
#
# Copyright (C) 2020 Juergen Adams
#
# J1 Notebooks is licensed under the MIT License.
# See: https://github.com/jekyll-one-org/J1 Notebooks/blob/master/LICENSE
#
# ------------------------------------------------------------------------------
# NOTES:
#   See: https://github.com/jekyll/jekyll/issues/1433
#
# Converters
#   jupyter nbconvert --to html --execute Visualisation.ipynb
#   jupyter nbconvert --to markdown --execute Visualisation.ipynb
#
# ------------------------------------------------------------------------------
require 'nokogiri'
require 'nokogiri-pretty'
require 'htmlbeautifier'
require 'rbconfig'

module Notebooks
  class Generator < Jekyll::Generator

    # Detects the operating system Jekyll is currently running
    #
    def os
      @os ||= (
      host_os = RbConfig::CONFIG['host_os']
      case host_os
      when /mswin|msys|mingw|cygwin|bccwin|wince|emc/
        :windows
      when /darwin|mac os/
        :macosx
      when /linux/
        :linux
      when /solaris|bsd/
        :unix
      else
        err_msg = "J1 Paginator failed to detect os. Unknown os: #{host_os.inspect} "
        Jekyll.logger.error err_msg
        raise ArgumentError.new(err_msg)
      end
      )
    end

    # Prettyfies the HTML output
    # pagination enabled on them. These pages will be used as templates
    #
    # input       - The HTML code to be prettyfied
    # nb_basename - (base)name of the notebook
    #
    def pretty_print(input, nb_basename)
      # 1st_stage, verify HTML
      # content = Nokogiri::HTML input
      # if content.errors.length > 5000000000
      #   err_msg = "J1 Paginator: failed to parse HTML for notebook #{nb_basename}"
      #   Jekyll.logger.error err_msg
      #   raise ArgumentError.new(err_msg)
      # else
      #   # 2nd_stage, HTML cleanup
      #   # pretty = HtmlBeautifier.beautify(content)
      #   HtmlBeautifier.beautify(content)
      # end
      HtmlBeautifier.beautify(input)
    end

    # Generator to create HTML output for Jupyter Notebooks configured
    #
    # site - Jekyll site object
    #
    def generate(site)
      # Load and parse config data
      #
      nb_config_defaults = site.data['plugins']['defaults']['notebooks']['settings']
      nb_config_settings = site.data['plugins']['notebooks']['settings']
      nb_settings = Jekyll::Utils.deep_merge_hashes(nb_config_defaults, nb_config_settings || {})

      if nb_settings['enabled']
        Jekyll.logger.info 'J1 Notebooks:', 'plugin enabled, start processing ...'

        # Base settings
        #
        dest = site.dest
        src = site.source
        nb_converter = nb_settings['html_converter']
        nb_beautify_html = nb_settings['beautify_html']
        nb_convert_type = nb_settings['html_convert_type']
        nb_git_repo = nb_settings['git_repo']
        # nb_src = nb_settings['notebook_path']
        nb_notebook_path = nb_settings['notebook_path']
        nb_html_path = File.join(dest, nb_settings['html_path'])
        nb_partials_path = File.join(dest, nb_settings['partials_path'])
        nb_template = File.join(src, nb_settings['template_path'], nb_settings['template_file'])
        # nb_template_data = File.read("#{nb_template}")
        platform = os

        # Create data paths
        #
        # check if file exists
        if(File.exist?("#{nb_partials_path}"))
          is_removed = FileUtils.rm "#{nb_partials_path}", force: true
        end
        FileUtils.mkdir_p("#{nb_html_path}")
        FileUtils.mkdir_p("#{nb_partials_path}")

        # Set the null device per platform
        #
        case platform
        when :windows
          null_device = 'NUL'
        else
          null_device = '/dev/null'
        end

        # Check if the (notebook) converter exists
        #
        nb_converter_exists = system "#{nb_converter} -h > #{null_device} 2>&1"

        # Process all configured notebooks (convert to HTML)
        #
        if nb_converter_exists
          Jekyll.logger.info 'J1 Notebooks:', 'process all notebooks configured ...'

          if nb_settings['enabled']
            nb_settings['notebooks'].each { |n|
              if n['notebook']['enabled']
                nb_html_data = File.read("#{nb_template}")
                nb_base_name = File.basename(n['notebook']['src'], '.ipynb')
                nb_partial_name = "#{nb_partials_path}" + '/' + "#{nb_base_name}" + '.html'
                nb_html_name = "#{nb_html_path}" + '/' + "#{nb_base_name}" + '.html'
                notebook = File.join(src, nb_notebook_path + '/' + n['notebook']['src'] )

                # Run the converter on current notebook
                #
                nb_created = system "#{nb_converter} -s #{nb_git_repo} -t #{nb_convert_type} -o #{nb_partials_path} #{notebook} > #{null_device} 2>&1"

                if !nb_created
                  Jekyll.logger.warn 'J1 Notebooks:', "processing notebook failed: #{n['notebook']['src']}"
                else
                  nb_partial_data = File.read("#{nb_partial_name}")
                  # Inject (sub! replaces inline) HTML (partial) data of the
                  # converted notebook into the HTML template
                  nb_html_data.sub!('<!-- nb_partial_code -->', "#{nb_partial_data}")
                  # Beautify final HTML code
                  if nb_beautify_html
                    nb_html_data = pretty_print(nb_html_data, nb_base_name)
                  end
                  # Write final HTML code to disk
                  File.write(nb_html_name, "#{nb_html_data}")
                  Jekyll.logger.info 'J1 Notebooks:', "processing notebook successful: #{n['notebook']['src']}"
                end
              end
            }
            Jekyll.logger.info 'J1 Notebooks:', 'processing notebook finished'
          else
            Jekyll.logger.info 'J1 Notebooks:', "#{nb_converter} missing"
            Jekyll.logger.info 'J1 Notebooks:', 'processing of notebooks skipped'
            return
          end
        end
      else
        Jekyll.logger.info 'J1 Notebooks:', 'plugin disabled'
      end
    end

  end
end
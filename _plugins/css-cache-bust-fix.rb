# al-folio keeps Sass partials in _sass/, but jekyll-cache-bust hashes assets/_sass/
# (which does not exist), producing a constant empty-file MD5 and stale browser caches.
require 'digest/md5'

module Jekyll
  module CacheBust
    def bust_css_cache(file_name)
      contents = []
      scss_entry = File.join('assets', 'css', 'main.scss')
      contents << File.read(scss_entry) if File.exist?(scss_entry)

      if Dir.exist?('_sass')
        Dir[File.join('_sass', '**', '*')].sort.each do |path|
          contents << File.read(path) unless File.directory?(path)
        end
      end

      [file_name, '?v=', Digest::MD5.hexdigest(contents.join)].join
    end
  end
end

Liquid::Template.register_filter(Jekyll::CacheBust)

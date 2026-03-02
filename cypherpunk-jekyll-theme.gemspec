# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "cypherpunk-jekyll-theme"
  spec.version       = "0.1.0"
  spec.authors       = ["757btc"]
  spec.summary       = "A cypherpunk terminal theme for Jekyll — CRT scan lines, Bitcoin HUD, green phosphor aesthetic."
  spec.homepage      = "https://github.com/757btc/cypherpunk-jekyll-theme"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f|
    f.match(%r{^(_layouts|_includes|_sass|assets|LICENSE|README)}i)
  }

  spec.add_runtime_dependency "jekyll", ">= 3.8", "< 5.0"
  spec.add_runtime_dependency "jekyll-paginate", "~> 1.1"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.0"
  spec.add_runtime_dependency "jekyll-feed", "~> 0.9"
end

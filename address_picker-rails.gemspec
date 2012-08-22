# Generated by jeweler
# DO NOT EDIT THIS FILE DIRECTLY
# Instead, edit Jeweler::Tasks in Rakefile, and run 'rake gemspec'
# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = "address_picker-rails"
  s.version = "0.1.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["David DIDIER"]
  s.date = "2012-07-25"
  s.description = "An address picker for Rails with autocompletion and map picking (adapted from https://github.com/sgruhier/jquery-addresspicker)"
  s.email = "c_inconnu@yahoo.fr"
  s.extra_rdoc_files = [
    "LICENSE.txt",
    "README.md"
  ]
  s.files = [
    ".document",
    ".rspec",
    "Gemfile",
    "LICENSE.txt",
    "README.md",
    "Rakefile",
    "VERSION",
    "lib/address_picker-rails.rb",
    "spec/spec_helper.rb"
  ]
  s.homepage = "http://github.com/ddidier/address_picker-rails"
  s.licenses = ["MIT"]
  s.require_paths = ["lib"]
  s.rubygems_version = "1.8.24"
  s.summary = "An address picker with autocompletion and map picking"

  if s.respond_to? :specification_version then
    s.specification_version = 3

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rails>, ["~> 3.2.0"])
      s.add_development_dependency(%q<bundler>, ["~> 1.1.0"])
      s.add_development_dependency(%q<capybara>, ["~> 1.1.0"])
      s.add_development_dependency(%q<guard>, ["~> 1.2.0"])
      s.add_development_dependency(%q<guard-rspec>, ["~> 1.2.0"])
      s.add_development_dependency(%q<guard-spork>, ["~> 1.1.0"])
      s.add_development_dependency(%q<jeweler>, ["~> 1.8.4"])
      s.add_development_dependency(%q<rdoc>, ["~> 3.12"])
      s.add_development_dependency(%q<rspec-rails>, ["~> 2.11.0"])
      s.add_development_dependency(%q<sqlite3>, ["~> 1.3.0"])
    else
      s.add_dependency(%q<rails>, ["~> 3.2.0"])
      s.add_dependency(%q<bundler>, ["~> 1.1.0"])
      s.add_dependency(%q<capybara>, ["~> 1.1.0"])
      s.add_dependency(%q<guard>, ["~> 1.2.0"])
      s.add_dependency(%q<guard-rspec>, ["~> 1.2.0"])
      s.add_dependency(%q<guard-spork>, ["~> 1.1.0"])
      s.add_dependency(%q<jeweler>, ["~> 1.8.4"])
      s.add_dependency(%q<rdoc>, ["~> 3.12"])
      s.add_dependency(%q<rspec-rails>, ["~> 2.11.0"])
      s.add_dependency(%q<sqlite3>, ["~> 1.3.0"])
    end
  else
    s.add_dependency(%q<rails>, ["~> 3.2.0"])
    s.add_dependency(%q<bundler>, ["~> 1.1.0"])
    s.add_dependency(%q<capybara>, ["~> 1.1.0"])
    s.add_dependency(%q<guard>, ["~> 1.2.0"])
    s.add_dependency(%q<guard-rspec>, ["~> 1.2.0"])
    s.add_dependency(%q<guard-spork>, ["~> 1.1.0"])
    s.add_dependency(%q<jeweler>, ["~> 1.8.4"])
    s.add_dependency(%q<rdoc>, ["~> 3.12"])
    s.add_dependency(%q<rspec-rails>, ["~> 2.11.0"])
    s.add_dependency(%q<sqlite3>, ["~> 1.3.0"])
  end
end

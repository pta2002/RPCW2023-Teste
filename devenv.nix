{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = with pkgs; [ docker-compose httpie ];

  languages.javascript.enable = true;
}

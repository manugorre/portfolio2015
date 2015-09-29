[![Build Status](https://travis-ci.org/manugorre/portfolio2015.svg)](https://travis-ci.org/manugorre/portfolio2015)

# Documentation portfolio2K15

## Introduction

1. Server NodeJs
2. Cloud Firebase


### installation et dépendances

#### Node et le gestionnaire de paquet NPM

Vérifier la dispo des  commandes suivantes :

```JS
node -v
npm -v
```

installer nodejs dans le cas contraire : http://nodejs.org/


#### Bower, Compass, Grunt

```JS
npm install -g bower
npm install -g compass
npm install -g brunch
```

Note : argument "-g" met à disposition globalement la commande


#### Install Ruby, Compass , imagemagick

[Ruby](http://www.ruby-lang.org/en/downloads/)
[Sass](http://sass-lang.com/tutorial.html)

#### Récupération des dépendances JS/CSS

```JS
bower install (project directory)
```

Note : bower.json charge les dépendances dans "bower_components"



#### Récupération des dépendances Node

```JS
npm install
```

Note : package.json charge les paquets dans "node_modules"

#### Créer un fichier config.json à la racine du projet

Conf des urls Firebase pour le stockage des données

```JS
{
	"name": "portfolio 2015",
	"version": "0.1.0",
	"url": {
		"development": "https://mon_url_firebase_dev.firebaseio.com",
		"production": "https://mon_url_firebase_prod.firebaseio.com"
	}
}

```

## Commandes Brunch

Lancer le serveur et scruter les changements :

```JS
brunch w -s
```

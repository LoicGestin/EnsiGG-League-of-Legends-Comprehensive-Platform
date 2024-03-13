# Projet de Spécialité - LOL

Introducing Ensi.GG, your all-in-one platform for champions builds, tier lists, and more, our vision is to provide you with everything you need through a beautifully designed, enjoyable, and easily accessible platform.

Accessible at - https://ensi.gg

For contributing, please install [VSCode](https://code.visualstudio.com/download) and the extension Git Graph.

## Design

Please install [Figma](https://www.figma.com/).

For accessing the project please ask a lead permissions.

## Others

For editing images, please install [Paint.net](https://www.getpaint.net/download.html).

Optional VSCode extensions:

- Material Icon Theme
- One Dark Pro

## Use case

```plantuml
left to right direction
actor "User" as us
actor "Game Creator" as gc
rectangle Ensi.gg {
  usecase "Ecrire un message dans le chat de la partie" as UC1 #pink;line:red;text:black
  usecase "Spéctateur de la partie" as UC2 #pink;line:red;text:black
  usecase "Afficher détail du jeu" as UC3 #Yellowgreen;line:green;text:black
  usecase "Afficher détail d'un personnage" as UC4 #Yellowgreen;line:green;text:black
  usecase "Afficher détail d'une partie" as UC5 #Yellowgreen;line:green;text:black
  usecase "Afficher détail d'un joueur" as UC6 #Yellowgreen;line:green;text:black
  usecase "Intéragir dans la partie" as UC7 #pink;line:red;text:black
  usecase "Lancer une partie" as UC8 #pink;line:red;text:black
  usecase "Créer une partie" as UC9 #pink;line:red;text:black
}
us --> UC1
us --> UC2
us --> UC3
us --> UC4
us --> UC5
us --> UC6
gc --> UC7
gc --> UC8
gc --> UC9

us <|-- gc
```

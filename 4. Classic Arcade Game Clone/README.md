frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

# How to run

Choose the folder in which you want to place the game and run the command in the console

```
git clone git@github.com:Divan4ik/udacity-fend.git
```

Next just open Classic Arcade Game Clone folder and open `index.html` on your favorite browser (hope that not IE < 10)

# How to play

The character below and in the middle of the screen is you. At the top is a pond in which you need to get to, but the path is blocked by beetles. Oh, you do not like them very much (sorry about that). Use the arrow keys to move around and dodge bugs. For reasons of ease of collision, there is a small chance that you will meet with the beetle even before visual contact. Yes, yes you are afraid of them, that's the thing :)

Enjoy!

# What is inside

If you're wondering what's going on inside the game, how collisions are determined, etc. During the game, open the console in the Developer tools and write:

```
env.DEBUG = true;
```
## Thank you
Thank you for taking the time to let me submit this code audition. I have to admit, this has easily been the most entertaining code challenge that I have been asked to complete - kudos! 

I believe that I have checked off all of the requirements AND all of the bonus request. As far as adding my own touch, you may notice that I don't believe one Rhino is enough. If you can get past a `distance travelled` of 3000 ft in my game, I'll happily work my first week with Ceros for free!*

**You can find the app here:** [http://ski.stephenkelzer.com/](http://ski.stephenkelzer.com/)

## Here is how things work:
- At any time you can pause the game by pressing 'P'
- You can press 'SPACEBAR' to jump
- You will notice statistics in the top left of the screen
- Jumping over an object boosts your score
- If you can jump over a Rhino, your score will soar!!
- If you get caught by a Rhino --> GAME OVER!
   - Press 'P' to start over
- (level 1) After 250ft, you will start to see Rhinos and obstacles will get more dense
- (level 2) After 750ft you will see more Rhinos and even more density in the obstacles
- (level 3) After 1250ft, you guessed it..  more and more of all the things!
- (level 4) You die, I certainly can't get past level 4 at least...
- (level 5) If you make it here, you're not human.

### Scoring
- 10 points per foot descended down the hill
- 1000 for each rock jumped over
- 100000 for each Rhino leaped over!

### Things I would like to work on more:
- I would like to convert the 'difficulty logic' to some sort of `DifficultyManager`
- I would like to get a lot higher test coverage
- I would like to create a high score tracker
- Adding an instructions (how to play) window
- Ability to use your mouse to steer (maybe click for mobile?)
- I realized that if you 'keep going left', you can make it pretty far.. I should mirror the Rhino image and insert some Rhinos from the left side of the screen so they come at you from both sides!

### Known issues
- There is one issue that I know about.
   - Sometimes you will get a nullReferenceException on startup. I **think** this has to do with async image loading, but I haven't done a deep dive into resolving it yet. Only seems to pop up when you repetatively hit refresh.

Thanks again for letting me attempt this, it's been a blast!


---


# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* ~~**Fix a bug:**~~

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
  
* ~~**Write unit tests:**~~

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* ~~**Extend existing functionality:**~~

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* ~~**Build something new:**~~

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* ~~**Documentation:**~~

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* ~~**Be original:**~~
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* ~~Provide a way to reset the game once it's over~~
* ~~Provide a way to pause and resume the game~~
* ~~Add a score that increments as the skier skis further~~
* ~~Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)~~
* ~~Deploy the game to a server so that we can play it without having to install it locally~~
* ~~Write more unit tests for your code~~

We are looking forward to see what you come up with!




\* No I won't, I lied. that's ridiculous!

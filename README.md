# planetaria
Newtonian N-body simulator in Javascript/HTML5

This simulator includes two classes of objects, particles and bodies. While particles move the bodies may not. It uses [leapfrog integration](https://en.wikipedia.org/wiki/Leapfrog_integration) to calculate motion. Particles do also interact.

To improve accuracy at the cost of speed lower dt.

[Click here for demo](https://wolfmankurd.github.io/planetaria/)

Here is the result of the above demo after some time.

![Demo Screenshot](screenshot.png?raw=true)

Released under GPL 3


## FAQ

**Why is this so slow?**

Speed can be increased at the cost of accuracy by increasing the value of dt.

**Can it's accuracy be improved?**

Decreasing dt improves accuracy at the cost of speed.

**How does this work?**

Each tick the force between each particle and body is calculated. This information is used in [leapfrog integration](https://en.wikipedia.org/wiki/Leapfrog_integration).

**Can I use this?**

I release this under GPL v3, up to date version maintained on GitHub (https://github.com/wolfmankurd/planetaria).

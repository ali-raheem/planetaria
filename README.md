# planetaria
Newtonian N-body simulator in Javascript/HTML5

This simulator includes two classes of objects, particles and bodies. While particles move the bodies may not. It uses [leapfrog integration](https://en.wikipedia.org/wiki/Leapfrog_integration) to calculate motion. Particles do also interact.

To improve accuracy at the cost of speed lower dt.

[Click here for demo](https://wolfmankurd.github.io/planetaria/). In the spawns a large stationary object, you can then click and drag to add particles.

Here is the result of the above demo after some time.

![Demo Screenshot](screenshot.png?raw=true).

Here are two examples of binary orbits. In the first one one of the particles, the more massive one, starts at rest.

![Binary orbits where V_2 = 0](boobs.png?raw=true).

Here the first particle starts with 10 times as much velocity.

![Binary orbits are quite attractive](binary.png?raw=true).

Another binary orbit here the more massive particle almost seems to be tracing a sinusoidal path.

![Remarkable path of blue particle](binary2.png?raw=true).

Released under GPL 3


## FAQ

**Why is this so slow?**

Speed can be increased at the cost of accuracy by increasing the value of dt.

**How accurate is this?**

It can be fairly accurate so long as the time interval is kept low compared to the forces. A good indication of accuracy is are there gaps appearing in the trajectories? If so accuracy has been degraded as dt is too large.

**Can it's accuracy be improved?**

Decreasing dt improves accuracy at the cost of speed.

**How does this work?**

Each tick the force between each particle and body is calculated. This information is used in [leapfrog integration](https://en.wikipedia.org/wiki/Leapfrog_integration).

**Can I use this?**

I release this under GPL v3, up to date version maintained on GitHub (https://github.com/wolfmankurd/planetaria).

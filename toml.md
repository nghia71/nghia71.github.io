![Math Club & Competitions (MCC)](./img/MCC-2024-Logo-Large.png)

# TOML — The Online Mathematics Laboratory

*An introduction for parents, teachers, and club organizers — with seven fully worked sample investigations.*

🇬🇧 English version below — 🇻🇳 [Bản tiếng Việt ở nửa sau của trang này](#toml--the-online-mathematics-laboratory-1)

## What is TOML?

TOML is a way of learning mathematics through **investigation**: instead of receiving a problem with a ready-made model solution, students receive a **genuine mathematical question** and walk the full path of a working mathematician — observing, gathering data, spotting patterns, forming conjectures, hunting for counterexamples, and finally **proving** what they believe to be true. In TOML, the computer plays the role a microscope plays in a biology lab: it lets students *see* structures that the naked eye and scratch paper cannot reach — a hidden cycle inside a sequence of a million terms, a common law across tens of thousands of geometric configurations — but it never replaces human reasoning.

TOML is **not** a programming course, not a competitive-algorithm training system, and not a judge that merely returns "right/wrong". Every TOML investigation ends not with a number but with an **insight**: a theorem proved, a counterexample found, a formula established, or an open question stated more precisely.

Every investigation moves through three activities, and the three-question structure of every problem mirrors them exactly:

1. **Explore** *(Question 1)*: use the computer to experiment, generate data, observe phenomena.
2. **Explain** *(Question 2)*: push the experiment to a larger scale and identify the mechanism behind the data.
3. **Establish** *(Question 3)*: convert experimental evidence into a rigorous mathematical proof.

Questions 1 and 2 are graded automatically (students submit a single number or short string). Question 3 — the question that truly separates levels of thinking — is submitted as a handwritten proof and graded by a teacher against the essential ideas of the solution.

The most important lesson TOML wants to hand its students is the boundary between **verification** and **proof**: a pattern that holds for the first million cases can still fail at case one-million-and-one (Problem 7 below is a classic example). Students may use any tool — including AI — to explore and to suggest directions, but they must be able to **explain and take responsibility for everything they submit**; any result produced by AI is always treated as a conjecture to be checked, never as a source of correctness.

The seven investigations below form TOML's complete sample set — each comes with reference Python code (short, optimal, easy to read) for the exploration phase and a complete mathematical proof for the establishment phase. **Every answer has been independently verified by computer.** Together they show concretely *what students do and how they do it* in TOML.

---

# PART I — THREE INVESTIGATIONS FOR MIDDLE SCHOOL (MS)

*Selection criteria: basic programming (loops, arrays, light recursion); mathematics centered on hands-on number theory, counting principles, and lattice geometry.*

---

## Problem 1. The Pisano period — last digits of Fibonacci numbers

| Field | Audience | Difficulty math / coding / openness | Role of the tool |
|---|---|---|---|
| Number theory | Grades 7–9 | ★★☆☆☆ / ★★☆☆☆ / ★★☆☆☆ | #Pattern_discovery — nearly essential |

### The problem

- **Q1 (Explore).** Find the **last digit** of the one-millionth Fibonacci number, $F_{1\,000\,000}$.
- **Q2 (Optimize).** Find the **last two digits** of the one-billionth Fibonacci number, $F_{1\,000\,000\,000}$.
- **Q3 (Prove).** Consider the sequence of remainders of the Fibonacci numbers modulo any positive integer $m$. Prove that this sequence is **necessarily periodic**, and that the period starts right at the beginning of the sequence (i.e., it returns to the remainder pair $(0, 1)$).

### Solution to Q1–Q2 (Python)

Computing $F_{10^9}$ directly is hopeless with an ordinary loop — that is exactly the "trap" that forces students to discover the **cycle**: the last digits repeat! Find the period, then reduce the index.

```python
def pisano_period(m):
    """Period of the Fibonacci sequence mod m: count steps until the pair (0, 1) returns."""
    a, b = 0, 1
    for step in range(1, m * m + 1):        # the period never exceeds m^2 (see Q3)
        a, b = b, (a + b) % m
        if (a, b) == (0, 1):
            return step

def fib_mod(n, m):
    """Compute F_n mod m by reducing the index modulo the Pisano period."""
    n_reduced = n % pisano_period(m)
    a, b = 0, 1
    for _ in range(n_reduced):
        a, b = b, (a + b) % m
    return a

print("Q1:", fib_mod(10**6, 10))                # last digit
print("Q2:", str(fib_mod(10**9, 100)).zfill(2)) # last two digits
```

**Output (verified):**

```
Pisano period mod 10  = 60      →  10^6 mod 60  = 40,  F_40  = 102334155
Pisano period mod 100 = 300     →  10^9 mod 300 = 100, F_100 = ...915075
Q1: 5
Q2: 75
```

**Auto-graded answers:** Q1: `5` — Q2: `75`.

### Q3 — Proof (pure periodicity of Fibonacci mod m)

**Step 1 — The sequence must repeat (the Pigeonhole Principle).** Each term of the remainder sequence is completely determined by the **pair of terms immediately before it**. The number of possible remainder pairs $(F_i \bmod m,\; F_{i+1} \bmod m)$ is finite: at most $m^2$. The Fibonacci sequence is infinite, so by the Pigeonhole Principle there exist positions $i < j$ (with $j - i \le m^2$) such that

$$(F_i, F_{i+1}) \equiv (F_j, F_{j+1}) \pmod{m}.$$

Since the recurrence $F_{n+2} = F_{n+1} + F_n$ depends only on the preceding pair, two positions with identical pairs generate identical tails: the sequence is periodic from position $i$ with period $T = j - i$.

**Step 2 — The period starts at the very beginning (backward determinism).** The key point: Fibonacci runs not only forward but also **backward**:

$$F_{n-1} = F_{n+1} - F_n.$$

So the pair $(F_n, F_{n+1})$ uniquely determines the pair before it, $(F_{n-1}, F_n)$ — also modulo $m$. From $(F_i, F_{i+1}) \equiv (F_j, F_{j+1})$, apply this backward step $i$ times:

$$(F_{i-1}, F_i) \equiv (F_{j-1}, F_j), \quad \dots, \quad (F_0, F_1) \equiv (F_{j-i}, F_{j-i+1}) \pmod{m}.$$

Hence the starting pair $(0, 1)$ reappears at position $T = j - i$: the remainder sequence is **purely periodic** — no pre-periodic "tail" — and the period is at most $m^2$. $\blacksquare$

> **Takeaway:** the computer's data *suggests* the cycle exists; the Pigeonhole Principle plus backward determinism *proves* it must exist for **every** $m$ — something no amount of experimentation could ever confirm.

---

## Problem 2. The game of Nim and the binary XOR strategy

| Field | Audience | Difficulty math / coding / openness | Role of the tool |
|---|---|---|---|
| Combinatorial games | Grades 8–9 | ★★★☆☆ / ★★☆☆☆ / ★★★☆☆ | #Configuration_search, #Pattern_discovery — useful |

### The problem

Two players alternately remove any positive number of stones from **one** pile. Whoever takes the last stone wins.

- **Q1 (Exhaustive search).** With 3 piles of at most 5 stones each: print **all** states $(a, b, c)$ with $a \le b \le c \le 5$ in which the player to move is **certain to lose** against optimal play.
- **Q2 (Apply).** A real match has piles $(13, 17, 30)$ and you move first. Find the optimal first move.
- **Q3 (Prove).** Using binary representation, state and prove the theorem giving the necessary and sufficient condition for a "losing state" in general Nim with $k$ piles $(n_1, \dots, n_k)$.

### Solution to Q1–Q2 (Python)

Q1 needs no prior theory: just define recursively *"you win iff some move puts your opponent in a losing state"* and let the computer search.

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def wins(state):
    """True if the player TO MOVE wins under optimal play by both sides."""
    if sum(state) == 0:
        return False                        # no stones left: the player to move has lost
    for i, pile in enumerate(state):
        for left in range(pile):            # try taking 1..pile stones from pile i
            new = list(state)
            new[i] = left
            if not wins(tuple(sorted(new))):
                return True                 # a move that puts the opponent in a losing state
    return False

# Q1: exhaustive search over all states a <= b <= c <= 5
losing = [(a, b, c) for a in range(6) for b in range(a, 6) for c in range(b, 6)
          if not wins((a, b, c))]
print("Q1:", losing)

# Looking at the data → conjecture: losing state <=> a XOR b XOR c == 0
print("XOR conjecture:", all(a ^ b ^ c == 0 for a, b, c in losing))

# Q2: use Bouton's theorem (proved in Q3) on the large state
s = 13 ^ 17 ^ 30                            # the "Nim sum" of the state
for pile in (13, 17, 30):
    if pile ^ s < pile:                     # reducing this pile to pile^s is a winning move
        print(f"Q2: take {pile - (pile ^ s)} stones from the pile of {pile}, leaving {pile ^ s}")
```

**Output (verified):**

```
Q1: [(0,0,0), (0,1,1), (0,2,2), (0,3,3), (0,4,4), (0,5,5), (1,2,3), (1,4,5)]
XOR conjecture: True
Q2: take 2 stones from the pile of 30, leaving 28    →  state (13, 17, 28) has XOR = 0
```

**Auto-graded answers:** Q1: the 8 states above — Q2: `take 2 stones from the pile of 30` (reaching $(13, 17, 28)$; this is the **unique** winning move).

### Q3 — Proof (Bouton's theorem, 1901)

**Theorem.** A Nim state $(n_1, \dots, n_k)$ is a **losing state** for the player to move if and only if the *Nim sum* $s = n_1 \oplus n_2 \oplus \dots \oplus n_k = 0$, where $\oplus$ is bitwise XOR.

*Proof.* We check three properties, then conclude by induction on the total number of stones.

**(a) The terminal state has $s = 0$.** The state $(0, \dots, 0)$ — where the player to move has no move and has lost — has XOR sum $0$.

**(b) From $s = 0$, every move leads to $s' \ne 0$.** A move replaces exactly one pile $n_i$ by $n_i' < n_i$. The new sum is

$$s' = s \oplus n_i \oplus n_i' = 0 \oplus n_i \oplus n_i' = n_i \oplus n_i'.$$

Since $n_i' \ne n_i$, we get $n_i \oplus n_i' \ne 0$. So a player in a balanced state is *forced* to break the balance.

**(c) From $s \ne 0$, some move leads to $s' = 0$.** Let $d$ be the **highest set bit** of $s$. Since bit $d$ of $s$ equals $1$, at least one pile $n_i$ has bit $d$ equal to $1$ (otherwise the XOR at that bit would be $0$). For that pile:

$$n_i' := n_i \oplus s < n_i,$$

because XOR-ing with $s$ flips bit $d$ of $n_i$ from $1$ to $0$ and touches only lower bits. So "reduce pile $n_i$ to $n_i \oplus s$" is a legal move, and it gives

$$s' = s \oplus n_i \oplus n_i' = s \oplus n_i \oplus n_i \oplus s = 0.$$

**Conclusion (induction on the total number of stones).** If $s = 0$: either the stones are gone and you have lost by (a), or by (b) every move of yours hands your opponent a state with $s' \ne 0$ and fewer stones — which by the induction hypothesis is a winning state for them. If $s \ne 0$: by (c) you have a move handing your opponent a state with $s' = 0$ and fewer stones — a losing state for them. $\blacksquare$

*Applied to Q2:* $13 \oplus 17 \oplus 30 = 2 \ne 0$, so the first player wins; the unique move restoring Nim sum $0$ is $30 \to 30 \oplus 2 = 28$.

> **Takeaway:** brute force handles the 5×5×5 table but is helpless against $(13, 17, 30)$ without theory; conversely, it is precisely the small exhaustive table where the XOR conjecture reveals itself. Experiment and proof lean on each other.

---

## Problem 3. Pick's theorem — area on the integer lattice

| Field | Audience | Difficulty math / coding / openness | Role of the tool |
|---|---|---|---|
| Lattice geometry | Grades 8–9 | ★★★☆☆ / ★★☆☆☆ / ★★★☆☆ | #Observation, #Pattern_discovery — useful |

### The problem

A *lattice polygon* has all vertices at integer points of the grid. Let $I$ be the number of lattice points **strictly inside** the polygon and $B$ the number of lattice points **on its boundary**.

- **Q1 (Experiment).** Count $I$ and $B$ for the right triangle $O(0,0)$, $A(6,0)$, $B(0,8)$.
- **Q2 (Discover).** Generate 20 different lattice polygons; for each, compute the area $S$ by the Shoelace (Gauss) formula and count $I$ and $B$. Find the constant $k$ in the relation $S = I + k \cdot B - 1$.
- **Q3 (Prove).** Prove Pick's theorem for all lattice polygons by a cut-and-paste argument: first explain why the theorem holds for a *primitive triangle* (a lattice triangle containing no lattice point other than its 3 vertices), then prove that the formula is **additive** when two polygons are glued together.

### Solution to Q1–Q2 (Python)

```python
from math import gcd
import random

def shoelace_area(verts):
    """Polygon area by Gauss's formula; vertices listed in boundary order."""
    n = len(verts)
    total = sum(verts[i][0] * verts[(i+1) % n][1] - verts[(i+1) % n][0] * verts[i][1]
                for i in range(n))
    return abs(total) / 2

def boundary_count(verts):
    """Lattice points on the boundary: an edge with vector (dx, dy) contributes gcd(|dx|, |dy|)."""
    n = len(verts)
    return sum(gcd(abs(verts[(i+1) % n][0] - verts[i][0]),
                   abs(verts[(i+1) % n][1] - verts[i][1])) for i in range(n))

def interior_count(verts):
    """Count lattice points strictly inside (convex polygon): all cross products share a sign."""
    def inside(p):
        signs = []
        for i in range(len(verts)):
            (x1, y1), (x2, y2) = verts[i], verts[(i+1) % len(verts)]
            d = (x2-x1) * (p[1]-y1) - (y2-y1) * (p[0]-x1)
            if d == 0:
                return False                 # boundary points don't count
            signs.append(d > 0)
        return all(signs) or not any(signs)
    xs, ys = [p[0] for p in verts], [p[1] for p in verts]
    return sum(inside((x, y)) for x in range(min(xs), max(xs) + 1)
                               for y in range(min(ys), max(ys) + 1))

# Q1: triangle O(0,0), A(6,0), B(0,8)
tri = [(0, 0), (6, 0), (0, 8)]
print("Q1: I =", interior_count(tri), " B =", boundary_count(tri), " S =", shoelace_area(tri))

# Q2: 20 random convex lattice polygons (convex hulls of random point sets)
def convex_hull(points):
    points = sorted(set(points))
    def half(seq):
        chain = []
        for p in seq:
            while len(chain) >= 2 and \
                  (chain[-1][0]-chain[-2][0]) * (p[1]-chain[-2][1]) - \
                  (chain[-1][1]-chain[-2][1]) * (p[0]-chain[-2][0]) <= 0:
                chain.pop()
            chain.append(p)
        return chain
    return half(points)[:-1] + half(points[::-1])[:-1]

random.seed(2026)
for _ in range(20):
    verts = convex_hull([(random.randint(0, 15), random.randint(0, 15)) for _ in range(12)])
    S, I, B = shoelace_area(verts), interior_count(verts), boundary_count(verts)
    assert (S + 1 - I) / B == 0.5            # k is always 1/2
print("Q2: k = 0.5 for all 20 polygons  →  S = I + B/2 - 1")
```

**Output (verified):**

```
Q1: I = 17  B = 16  S = 24.0        (check: 17 + 16/2 - 1 = 24 ✓)
Q2: k = 0.5 for all 20 polygons  →  S = I + B/2 - 1
```

**Auto-graded answers:** Q1: `I = 17, B = 16` — Q2: `k = 0.5` (Pick's theorem: $S = I + \frac{B}{2} - 1$).

### Q3 — Proof (Pick's theorem)

Set $P(G) := I + \frac{B}{2} - 1$ for a lattice polygon $G$. We must show $S(G) = P(G)$.

**Step 1 — Primitive triangles.** A *primitive triangle* has $I = 0$, $B = 3$, so Pick's formula predicts $S = 0 + \frac{3}{2} - 1 = \frac{1}{2}$. We show its area really is $\frac{1}{2}$: take a primitive triangle $T$ with vertices $A, B, C$. Reflect $T$ through the midpoint of side $BC$ to get $T'$; the union $T \cup T'$ is a parallelogram $H$ with lattice vertices, and — since point reflection through a half-lattice point maps the lattice to itself — $H$ likewise contains no lattice points besides its 4 vertices. The translates of $H$ by its two edge vectors **tile the plane**, and each copy "owns" exactly one lattice point (one vertex). The density of lattice points in the plane is $1$ per unit area, so $H$ has area $1$, hence $S(T) = \frac{1}{2}$. So the formula holds for every primitive triangle.

**Step 2 — Additivity of Pick's formula.** Suppose the polygon $G$ is glued from two lattice polygons $G_1, G_2$ along a common polyline containing $e$ lattice points (endpoints included). Under gluing:

- Areas add: $S = S_1 + S_2$.
- The $e - 2$ interior points of the seam switch from "boundary" to "interior": $I = I_1 + I_2 + (e - 2)$.
- Boundary points: the seam's interior points were counted in both $B_1$ and $B_2$ and then leave the boundary; the two endpoints were counted twice but remain on the boundary: $B = B_1 + B_2 - 2(e - 2) - 2$.

Therefore:

$$P(G_1) + P(G_2) = (I_1 + I_2) + \frac{B_1 + B_2}{2} - 2 = \big(I - (e-2)\big) + \frac{B + 2(e-2) + 2}{2} - 2 = I + \frac{B}{2} - 1 = P(G).$$

So if Pick's formula holds for $G_1$ and $G_2$, it holds for $G$ (and conversely: if it holds for $G$ and one piece, it holds for the other piece).

**Step 3 — Conclusion by induction.** Every lattice polygon can be triangulated (induction on the number of vertices: any polygon with $\ge 4$ vertices has a diagonal lying entirely inside it, splitting it into two smaller polygons). Every lattice triangle can be further subdivided into primitive triangles (induction on the number of lattice points it contains: while some lattice point other than the 3 vertices remains, join it to the vertices to split the triangle). Apply Step 1 to each primitive piece and reassemble with Step 2 to get $S(G) = P(G)$ for every lattice polygon. $\blacksquare$

> **Takeaway:** the computer finds the coefficient $k = \frac{1}{2}$ in seconds, but the question "why $\frac{1}{2}$ for **every** polygon?" can only be answered by cut-and-paste and induction.

---

# PART II — THREE INVESTIGATIONS FOR HIGH SCHOOL (HS)

*Selection criteria: algorithmic thinking with awareness of complexity; more advanced mathematics — generating functions, analytic limits, computational geometry.*

---

## Problem 4. Integer partitions and Euler's identity

| Field | Audience | Difficulty math / coding / openness | Role of the tool |
|---|---|---|---|
| Combinatorics | Grades 10–12 | ★★★★☆ / ★★★☆☆ / ★★★☆☆ | #Verification, #Method_comparison — nearly essential |

### The problem

A *partition* of a positive integer $n$ is a way of writing $n$ as a sum of positive integers, order ignored.

- **Q1 (Dynamic programming).** Compute the number of partitions of $n = 60$. (Naive recursion is far too slow — find an $O(n^2)$ algorithm.)
- **Q2 (Compare).** For $n = 100$, compute and compare: (a) the number of partitions of $n$ into **odd** parts; (b) the number of partitions of $n$ into **pairwise distinct** parts.
- **Q3 (Prove).** Use **generating functions** to prove Euler's identity: for every $n$, the number of partitions of $n$ into odd parts equals the number of partitions of $n$ into distinct parts.

### Solution to Q1–Q2 (Python)

```python
def partitions(n, parts):
    """Number of ways to write n as a sum of elements from 'parts' (unlimited reuse).

    dp[i] = number of partitions of i. Processing each part k exactly once,
    in order, prevents counting permutations of the same partition twice. O(n^2).
    """
    dp = [1] + [0] * n
    for k in parts:
        for i in range(k, n + 1):
            dp[i] += dp[i - k]
    return dp[n]

def distinct_partitions(n):
    """Same, but each part may be used AT MOST ONCE: sweep i downward (0/1 style)."""
    dp = [1] + [0] * n
    for k in range(1, n + 1):
        for i in range(n, k - 1, -1):
            dp[i] += dp[i - k]
    return dp[n]

print("Q1: p(60) =", partitions(60, range(1, 61)))
odd      = partitions(100, range(1, 101, 2))      # odd parts only: 1, 3, 5, ...
distinct = distinct_partitions(100)
print(f"Q2: odd(100) = {odd},  distinct(100) = {distinct}")
```

**Output (verified):**

```
Q1: p(60) = 966467
Q2: odd(100) = 444793,  distinct(100) = 444793      ← the two counts are EQUAL!
```

**Auto-graded answers:** Q1: `966467` — Q2: `444793` (both quantities).

### Q3 — Proof (Euler's identity via generating functions)

The generating function for partitions into **odd** parts (each odd part $2j-1$ used $0, 1, 2, \dots$ times):

$$O(x) = \prod_{j \ge 1} \frac{1}{1 - x^{2j-1}} = \frac{1}{(1-x)(1-x^3)(1-x^5)(1-x^7)\cdots}$$

The generating function for partitions into **distinct** parts (each part $k$ used $0$ or $1$ times):

$$D(x) = \prod_{k \ge 1} (1 + x^k) = (1+x)(1+x^2)(1+x^3)(1+x^4)\cdots$$

Apply the identity $1 + x^k = \dfrac{1 - x^{2k}}{1 - x^k}$ to every factor:

$$D(x) = \prod_{k \ge 1} \frac{1 - x^{2k}}{1 - x^k} = \frac{(1-x^2)(1-x^4)(1-x^6)(1-x^8)\cdots}{(1-x)(1-x^2)(1-x^3)(1-x^4)\cdots}$$

The numerator consists of exactly the factors $(1 - x^{2k})$ with **even** exponents; they cancel all even-exponent factors of the denominator. After cancellation, only the **odd**-exponent factors remain below:

$$D(x) = \frac{1}{(1-x)(1-x^3)(1-x^5)(1-x^7)\cdots} = O(x).$$

Equal formal power series have equal coefficients: the coefficient of $x^n$ in $O(x)$ (partitions into odd parts) equals the coefficient of $x^n$ in $D(x)$ (partitions into distinct parts), for every $n$. $\blacksquare$

*Technical note:* everything above takes place in the ring of formal power series: the coefficient of $x^n$ depends on only finitely many factors, so the "infinite cancellation" is legitimate. An equally beautiful alternative proof builds a **bijection**: split each even part $2^a \cdot l$ ($l$ odd) into $2^a$ copies of $l$ — strong students should try both routes.

> **Takeaway:** the computer *astonishes* students by showing two utterly different counting problems produce the same sequence; generating functions turn that astonishment into an inevitable identity in a few lines of algebra.

---

## Problem 5. The distribution of primes and the Prime Number Theorem

| Field | Audience | Difficulty math / coding / openness | Role of the tool |
|---|---|---|---|
| Number theory – Analysis | Grades 11–12 | ★★★★☆ / ★★★☆☆ / ★★☆☆☆ | #Observation, #Verification — nearly essential |

### The problem

Let $\pi(x)$ denote the number of primes not exceeding $x$.

- **Q1 (Optimized sieve).** Write a Sieve of Eratosthenes fast enough to compute $\pi(10^8)$.
- **Q2 (Limit).** Compute the ratio $R(x) = \dfrac{\pi(x)}{x / \ln x}$ at $x = 10^4, 10^5, 10^6, 10^7, 10^8$. What is the trend?
- **Q3 (Apply the theory).** State the Prime Number Theorem. Use it to estimate the **number of decimal digits** of the $10^{12}$-th prime (the trillionth prime).

### Solution to Q1–Q2 (Python)

```python
from math import isqrt, log

def eratosthenes_sieve(limit):
    """sieve[i] = 1 iff i is prime. Runs in ~15 seconds for limit = 10^8.

    Two key optimizations: only sieve up to the square root of the limit,
    and mark multiples with slice assignment (much faster than a pure Python loop).
    """
    sieve = bytearray([1]) * limit
    sieve[0] = sieve[1] = 0
    for i in range(2, isqrt(limit) + 1):
        if sieve[i]:
            sieve[i*i::i] = bytearray(len(sieve[i*i::i]))
    return sieve

sieve = eratosthenes_sieve(10**8)
print("Q1: pi(10^8) =", sum(sieve))

count, e = 0, 4
for x in range(2, 10**8):                    # Q2: one sweep, print at each milestone
    count += sieve[x]
    if x + 1 == 10**e:
        print(f"Q2: x = 10^{e}:  pi(x) = {count:>9}  R(x) = {count / (10**e / log(10**e)):.4f}")
        e += 1
```

**Output (verified):**

```
Q1: pi(10^8) = 5761455
Q2: x = 10^4:  pi(x) =      1229  R(x) = 1.1320
    x = 10^5:  pi(x) =      9592  R(x) = 1.1043
    x = 10^6:  pi(x) =     78498  R(x) = 1.0845
    x = 10^7:  pi(x) =    664579  R(x) = 1.0712
    x = 10^8:  pi(x) =   5761455  R(x) = 1.0613     → slowly decreasing toward 1
```

**Auto-graded answers:** Q1: `5761455` — Q2: the sequence $1.1320,\ 1.1043,\ 1.0845,\ 1.0712,\ 1.0613$ creeping toward $1$.

### Q3 — Solution (the Prime Number Theorem and the digits of $p_{10^{12}}$)

**The Prime Number Theorem (Hadamard – de la Vallée Poussin, 1896).**

$$\lim_{x \to \infty} \frac{\pi(x)}{x / \ln x} = 1.$$

**Consequence for the $n$-th prime.** Let $p_n$ be the $n$-th prime, so $\pi(p_n) = n$. Substituting into the theorem: $n \sim \dfrac{p_n}{\ln p_n}$, hence $p_n \sim n \ln p_n$. Taking logarithms gives $\ln p_n \sim \ln n$ (lower-order terms are negligible), therefore

$$p_n \sim n \ln n.$$

**Applying $n = 10^{12}$:**

$$p_{10^{12}} \approx 10^{12} \cdot \ln(10^{12}) = 10^{12} \cdot 12 \ln 10 \approx 10^{12} \cdot 12 \times 2.302585 \approx 2.76 \times 10^{13}.$$

The number of digits of a positive integer $N$ is $\lfloor \log_{10} N \rfloor + 1$:

$$\log_{10}\left(2.76 \times 10^{13}\right) \approx 13.44 \quad \Rightarrow \quad \lfloor 13.44 \rfloor + 1 = 14 \text{ digits}.$$

*Independent check:* the true value is $p_{10^{12}} = 29\,996\,224\,275\,833 \approx 3.0 \times 10^{13}$ — exactly **14 digits**. The estimate $n \ln n$ undershoots by about $8\%$ (the refinement $n(\ln n + \ln \ln n)$ gives $3.03 \times 10^{13}$), but the conclusion about the digit count is robust. $\blacksquare$

> **Takeaway:** the sieve's data ($R(x)$ decreasing *very* slowly — still 6% away from 1 at $10^8$!) gives students an honest feel for the lazy convergence in the PNT — and for why extrapolating from finite data needs theory as its guide.

---

## Problem 6. Convex hulls and the left-turn / right-turn test

| Field | Audience | Difficulty math / coding / openness | Role of the tool |
|---|---|---|---|
| Computational geometry | Grades 10–12 | ★★★☆☆ / ★★★★☆ / ★★☆☆☆ | #Configuration_search, #Visualization — nearly essential |

### The problem

- **Q1 (Warm-up).** Given 5 points $A(0,0)$, $B(4,0)$, $C(0,4)$, $D(2,1)$, $E(1,1)$: for each point, check by program whether it lies **strictly inside** the convex polygon formed by the remaining points.
- **Q2 (Algorithm).** Generate $10\,000$ random integer points (fixed seed `2026`, coordinates in $[-10^6, 10^6]$). Implement an $O(n \log n)$ convex hull algorithm (Graham Scan or Andrew's Monotone Chain) and report how many vertices the hull has.
- **Q3 (Mathematical foundation).** The decisive tool in every convex hull algorithm is the **cross product**. Write the determinant formula that tests "left turn or right turn" through three consecutive points $P_1, P_2, P_3$, and **prove** why the sign of that determinant tells the turn direction.

### Solution to Q1–Q2 (Python)

```python
import random

def cross(o, a, b):
    """Cross product of vectors OA and OB: > 0 left turn, < 0 right turn, = 0 collinear."""
    return (a[0]-o[0]) * (b[1]-o[1]) - (a[1]-o[1]) * (b[0]-o[0])

def convex_hull(points):
    """Andrew's monotone chain, O(n log n): build the lower then the upper hull."""
    points = sorted(set(points))
    def half(seq):
        chain = []
        for p in seq:
            while len(chain) >= 2 and cross(chain[-2], chain[-1], p) <= 0:
                chain.pop()                  # not a left turn: discard the middle vertex
            chain.append(p)
        return chain
    return half(points)[:-1] + half(points[::-1])[:-1]

# Q1: strictly inside <=> walking the boundary, the point stays on the same side
pts = {'A': (0,0), 'B': (4,0), 'C': (0,4), 'D': (2,1), 'E': (1,1)}
for name, p in pts.items():
    h = convex_hull([q for t, q in pts.items() if t != name])
    if all(cross(h[i], h[(i+1) % len(h)], p) > 0 for i in range(len(h))):
        print(f"Q1: {name}{p} lies strictly inside")

# Q2: hull of 10,000 points (fixed seed => a unique gradable answer)
random.seed(2026)
cloud = [(random.randint(-10**6, 10**6), random.randint(-10**6, 10**6))
         for _ in range(10_000)]
print("Q2: hull vertices =", len(convex_hull(cloud)))
```

**Output (verified):**

```
Q1: D(2, 1) lies strictly inside
Q1: E(1, 1) lies strictly inside
Q2: hull vertices = 26
```

**Auto-graded answers:** Q1: `D, E` — Q2: `26`.

### Q3 — Proof (the sign of the cross product determines the turn)

Take three consecutive points $P_1(x_1, y_1)$, $P_2(x_2, y_2)$, $P_3(x_3, y_3)$ and the two displacement vectors $\vec{u} = \overrightarrow{P_1 P_2}$, $\vec{v} = \overrightarrow{P_2 P_3}$. The quantity in question is the determinant

$$D = \det \begin{pmatrix} x_2 - x_1 & y_2 - y_1 \\ x_3 - x_2 & y_3 - y_2 \end{pmatrix} = (x_2 - x_1)(y_3 - y_2) - (y_2 - y_1)(x_3 - x_2).$$

**Proving what the sign means.** Write both vectors in polar form: $\vec{u} = r_1(\cos\alpha, \sin\alpha)$ and $\vec{v} = r_2(\cos\beta, \sin\beta)$ with lengths $r_1, r_2 > 0$ and direction angles $\alpha, \beta$ measured from the positive $x$-axis. Expanding directly:

$$D = r_1 r_2 (\cos\alpha \sin\beta - \sin\alpha \cos\beta) = r_1 r_2 \sin(\beta - \alpha).$$

The difference $\beta - \alpha$ is precisely the **turning angle** from the old heading $\vec{u}$ to the new heading $\vec{v}$. Since $r_1 r_2 > 0$, the sign of $D$ equals the sign of $\sin(\beta - \alpha)$:

- $D > 0 \iff \sin(\beta - \alpha) > 0$: the heading rotates **counterclockwise** — a **left** turn. Graham Scan keeps $P_2$ on the hull.
- $D < 0$: the heading rotates **clockwise** — a **right** turn. The point $P_2$ has been "wrapped inside" and is discarded from the hull.
- $D = 0$: the three points are **collinear**.

Geometrically, $\frac{D}{2}$ is the **signed area** of triangle $P_1 P_2 P_3$ — positive exactly when the vertices are listed counterclockwise. It is also the basic building block of the Shoelace formula of Problem 3: one determinant, two roles. $\blacksquare$

*Why the algorithm's correctness rests on this:* a polygon is convex if and only if walking its boundary you always turn to the same side; the test $D$ lets the algorithm maintain the **invariant** "the current vertex chain only ever turns left" after every insertion — and that invariant is the entire soul of the correctness proof of Graham Scan / Andrew's algorithm.

> **Takeaway:** with integer coordinates, the test $D$ is **exact arithmetic** — no rounding error. The same test written with floating-point angles (arctangents) can silently give a wrong answer. Choosing the right representation is also doing mathematics.

---

# BONUS PROBLEM — A CLASSIC EXTRAPOLATION TRAP

*The TOML framework requires every pilot set to include at least one problem that is "correct in many small cases but wrong later". The six problems above are all of the kind where the pattern is real; this seventh problem teaches the opposite lesson — which is exactly why it was added to the sample set.*

---

## Problem 7. Moser's circle problem — when 1, 2, 4, 8, 16 is not what you think

| Field | Audience | Difficulty math / coding / openness | Role of the tool |
|---|---|---|---|
| Combinatorics – Geometry | Grades 9–12 | ★★★★☆ / ★★★☆☆ / ★★★★☆ | #Counterexample_hunt — **potentially misleading** if you only look at small data |

### The problem

Place $n$ points on a circle in *general position* (no three chords meeting at a common interior point), then draw **all** chords joining pairs of points. Let $R(n)$ be the number of regions the disk is divided into.

- **Q1 (Observe — do it by hand first!).** Draw and count $R(1), \dots, R(5)$. What is your guess for $R(6)$? Now draw very carefully (or use a program) and count $R(6)$ again.
- **Q2 (Exact survey).** Write a program that counts $R(n)$ using **exact geometry** (rational numbers, no floating point) up to $n = 12$, and find the true formula for $R(n)$ in terms of binomial coefficients.
- **Q3 (Prove).** Prove the formula $R(n) = \binom{n}{4} + \binom{n}{2} + 1$ using Euler's formula for planar graphs, $V - E + F = 2$.

### Solution to Q1–Q2 (Python)

```python
from itertools import combinations
from fractions import Fraction
from math import comb

def region_count(n):
    """Count R(n) via Euler's formula V - E + F = 2, using EXACT geometry.

    Place point i at (2^i, 4^i) on the parabola y = x^2: the points are in convex
    position, the coordinates are rational so every computation is exact (no float
    error), and the chords' crossing structure is identical to that on a circle.
    """
    points = [(Fraction(2)**i, Fraction(4)**i) for i in range(n)]
    chords = list(combinations(points, 2))

    def interior_intersection(c1, c2):
        """Exact intersection point of two segments, if they cross strictly inside."""
        (p1, p2), (p3, p4) = c1, c2
        d = (p2[0]-p1[0])*(p4[1]-p3[1]) - (p2[1]-p1[1])*(p4[0]-p3[0])
        if d == 0:
            return None
        t = ((p3[0]-p1[0])*(p4[1]-p3[1]) - (p3[1]-p1[1])*(p4[0]-p3[0])) / d
        u = ((p3[0]-p1[0])*(p2[1]-p1[1]) - (p3[1]-p1[1])*(p2[0]-p1[0])) / d
        if 0 < t < 1 and 0 < u < 1:
            return (p1[0] + t*(p2[0]-p1[0]), p1[1] + t*(p2[1]-p1[1]))
        return None

    crossings = [g for c1, c2 in combinations(chords, 2)
                 if (g := interior_intersection(c1, c2)) is not None]
    assert len(crossings) == len(set(crossings)), "not in general position: 3 concurrent chords"

    I = len(crossings)                   # interior intersection points
    V = n + I                            # vertices: n boundary points + I crossings
    E = n + len(chords) + 2*I            # edges: n arcs + the subdivided chords
    return (2 - V + E) - 1               # Euler's formula, minus the unbounded outer face

print("Q1: R(1)..R(6) =", [region_count(n) for n in range(1, 7)])
for n in range(1, 13):                   # Q2: match the formula up to n = 12
    assert region_count(n) == comb(n, 4) + comb(n, 2) + 1
print("Q2: R(n) = C(n,4) + C(n,2) + 1 matches exact geometry up to n = 12")
```

**Output (verified):**

```
Q1: R(1)..R(6) = [1, 2, 4, 8, 16, 31]        ← NOT 32!
Q2: R(n) = C(n,4) + C(n,2) + 1 matches exact geometry up to n = 12
```

**Auto-graded answers:** Q1: `31` — Q2: $R(n) = \binom{n}{4} + \binom{n}{2} + 1$. (Ironically, $R(10) = 256$ is a power of 2 again — pure coincidence!)

### Q3 — Proof (Euler's formula for planar graphs)

The chords and circular arcs form a connected planar graph. We count vertices $V$, edges $E$, and faces $F$ (including the unbounded outer face), then use $V - E + F = 2$.

**Counting interior intersection points.** Two chords cross strictly inside the disk if and only if their four endpoints **interleave** around the circle — that is, every 4-element subset of the $n$ points produces exactly **one** crossing pair of chords (the two "diagonals" of the convex quadrilateral those 4 points form). General position guarantees these crossing points are pairwise distinct, so the number of interior intersection points is

$$I = \binom{n}{4}.$$

**Counting vertices.** $V = n + I = n + \binom{n}{4}$ (the $n$ boundary points plus the crossings).

**Counting edges.** Each interior crossing lies on exactly 2 chords and **splits each into one more segment**. A chord containing $t$ crossings is divided into $t + 1$ segments; summing over all $\binom{n}{2}$ chords, the total number of "lies-on" incidences is $2I$, so the chords contribute $\binom{n}{2} + 2I$ edge segments. Adding the $n$ circular arcs of the boundary:

$$E = n + \binom{n}{2} + 2\binom{n}{4}.$$

**Applying Euler's formula.** The graph is connected (every vertex is joined to the boundary through the chords), so

$$F = 2 - V + E = 2 - n - \binom{n}{4} + n + \binom{n}{2} + 2\binom{n}{4} = 2 + \binom{n}{2} + \binom{n}{4}.$$

Subtracting the unbounded face outside the circle:

$$R(n) = \binom{n}{4} + \binom{n}{2} + 1. \qquad \blacksquare$$

*Re-checking the opening sequence:* $R(5) = 5 + 10 + 1 = 16$ but $R(6) = 15 + 15 + 1 = \mathbf{31}$. The "doubling" pattern $1, 2, 4, 8, 16$ was an illusion of small data.

> **Takeaway — the most important of the whole set:** the first five data points *scream* $2^{n-1}$, and they are wrong. Verification is not proof. This is also the one problem where the right advice for Q1 is **don't rush to code** — drawing by hand up to $n = 5$ is faster; but when you need certainty that $R(6) = 31$ (hand drawings miscount easily) and need to rule out three concurrent chords, the computer's exact rational arithmetic becomes irreplaceable. Knowing *when* to use the tool is part of the mathematics.

---

# FOR PARENTS AND ORGANIZERS

**What will your child actually learn?** Not "more programming" or "solving faster", but the foundational capacities of scientific thinking: stating a precise conjecture from data; sharply distinguishing *verification* from *proof*; actively hunting for counterexamples and edge cases; deciding whether a tool should be used at all and being able to explain every line of code they use; and revising their beliefs when new evidence appears. In TOML, a *discovery journal* recording wrong conjectures and dead ends is valued no less than a correct solution — because that is the honest picture of mathematics being made.

**How grading and operations work.** Questions 1 and 2 of every problem are graded automatically (students submit a single number or short string — every answer key has been independently verified by the editorial team's own programs). Question 3 is submitted as a photo of a handwritten proof; the grader checks it against the essential ideas of the reference solution (the Pigeonhole Principle and backward stepping in Problem 1; the XOR sum in Problem 2; cut-and-paste in Problem 3; generating functions in Problem 4; Euler's formula in Problem 7…). The planned release rhythm during the pilot: at most three investigations per week — one main, one short, one optional extension.

**On AI and academic integrity.** Students may use AI to suggest directions or draft initial code, under two non-negotiable conditions: they must declare the scope of its use in their journal, and they must be able to explain everything they submit. Personal journals are private by default; there are no leaderboards built on students' mistakes; data is collected only to the extent the educational goals require.

**A deliberate confession.** The first draft of this very sample set contained several wrong answer keys — they were caught only when independently verified by program, following exactly the editorial process TOML prescribes for itself. We keep that story here because it *is* the central lesson of the whole project: *in mathematics, no one — not the problem setter, not the computer, not the AI — is exempt from the duty of verification.* Tools extend the learner's power to observe and experiment; the responsibility to understand, conclude, and reason remains human.

---
---
# TOML — The Online Mathematics Laboratory

*Phòng thí nghiệm Toán học Trực tuyến — trang giới thiệu dành cho phụ huynh, giáo viên và người tổ chức câu lạc bộ.*

## TOML là gì?

TOML là một cách học toán thông qua **điều tra**: thay vì nhận một bài toán đã có sẵn lời giải mẫu, học sinh nhận một **câu hỏi toán học thật** và tự mình đi hết hành trình của một nhà toán học — quan sát, thu thập dữ liệu, phát hiện quy luật, đặt giả thuyết, săn tìm phản ví dụ, và cuối cùng **chứng minh** điều mình tin là đúng. Máy tính trong TOML đóng vai trò như kính hiển vi trong phòng thí nghiệm sinh học: nó giúp học sinh *nhìn thấy* những cấu trúc mà mắt thường và giấy nháp không với tới được — chu kỳ ẩn trong một dãy số triệu phần tử, quy luật chung của hàng vạn cấu hình hình học — nhưng nó không bao giờ thay thế được lập luận của con người.

TOML **không phải** là một khóa học lập trình, không phải hệ thống luyện thuật toán thi đấu, và không phải một trang chấm bài chỉ trả về "đúng/sai". Mỗi cuộc điều tra của TOML kết thúc không phải ở một con số mà ở một **hiểu biết**: một định lý được chứng minh, một phản ví dụ được tìm thấy, một công thức được xác lập, hoặc một câu hỏi mở được phát biểu chính xác hơn.

Mỗi cuộc điều tra đi qua ba hoạt động, và cấu trúc ba câu hỏi của mọi bài đều phản ánh đúng ba hoạt động đó:

1. **Explore — Khảo sát** *(Câu 1)*: dùng máy tính để thí nghiệm, sinh dữ liệu, quan sát hiện tượng.
2. **Explain — Giải thích** *(Câu 2)*: đẩy thí nghiệm đến quy mô lớn hơn, nhận diện cơ chế đứng sau dữ liệu.
3. **Establish — Xác lập** *(Câu 3)*: chuyển hóa bằng chứng thực nghiệm thành một chứng minh toán học chặt chẽ.

Câu 1 và Câu 2 được chấm tự động (học sinh nộp một con số hoặc chuỗi ngắn). Câu 3 — câu quyết định để phân loại tư duy — được nộp dưới dạng bài chứng minh viết tay và được giáo viên chấm theo các ý tưởng bản chất.

Bài học quan trọng nhất mà TOML muốn trao cho học sinh là ranh giới giữa **kiểm chứng** và **chứng minh**: một quy luật đúng với một triệu trường hợp đầu tiên vẫn có thể sai ở trường hợp thứ một triệu lẻ một (Bài 7 dưới đây là một ví dụ kinh điển). Học sinh được phép dùng mọi công cụ — kể cả AI — để khảo sát và gợi ý hướng đi, nhưng phải **giải thích được và chịu trách nhiệm về mọi thứ mình nộp**; kết quả do AI đưa ra luôn được coi là một giả thuyết cần kiểm tra, không bao giờ là nguồn xác nhận tính đúng đắn.

Bảy cuộc điều tra dưới đây là bộ mẫu hoàn chỉnh của TOML — mỗi bài kèm mã Python tham khảo (ngắn, tối ưu, dễ đọc) cho phần khảo sát và một chứng minh toán học đầy đủ cho phần xác lập. **Toàn bộ đáp số đã được kiểm chứng độc lập bằng máy tính.** Chúng cho thấy cụ thể "học sinh sẽ làm gì và làm như thế nào" trong TOML.

---

# PHẦN I — BA CUỘC ĐIỀU TRA CHO THCS (MS)

*Tiêu chí: lập trình mức cơ bản (vòng lặp, mảng, đệ quy nhẹ); toán học tập trung vào số học trực quan, nguyên lý đếm và hình học ô lưới.*

---

## Bài 1. Chu kỳ Pisano — chữ số tận cùng của Fibonacci

| Lĩnh vực | Đối tượng | Độ khó toán / kỹ thuật / độ mở | Vai trò công cụ |
|---|---|---|---|
| Số học | Lớp 7–9 | ★★☆☆☆ / ★★☆☆☆ / ★★☆☆☆ | #Phát_hiện_Quy_luật — gần như thiết yếu |

### Đề bài

- **Câu 1 (Khảo sát).** Tìm **chữ số tận cùng** của số Fibonacci thứ một triệu, $F_{1\,000\,000}$.
- **Câu 2 (Tối ưu).** Tìm **hai chữ số tận cùng** của số Fibonacci thứ một tỷ, $F_{1\,000\,000\,000}$.
- **Câu 3 (Chứng minh).** Xét dãy số dư của Fibonacci khi chia cho một số nguyên dương $m$ bất kỳ. Chứng minh rằng dãy số dư này **bắt buộc tuần hoàn**, và chu kỳ luôn bắt đầu ngay từ đầu dãy (tức là quay về cặp số dư $(0, 1)$).

### Lời giải Câu 1–2 (Python)

Tính trực tiếp $F_{10^9}$ là bất khả thi với vòng lặp thường — đó chính là cái "bẫy" buộc học sinh phải tìm ra **chu kỳ**: dãy chữ số tận cùng lặp lại! Chỉ cần tìm chu kỳ rồi rút gọn chỉ số.

```python
def chu_ky_pisano(m):
    """Chu kỳ của dãy Fibonacci mod m: đếm số bước đến khi gặp lại cặp (0, 1)."""
    a, b = 0, 1
    for buoc in range(1, m * m + 1):        # chu kỳ không vượt quá m^2 (xem Câu 3)
        a, b = b, (a + b) % m
        if (a, b) == (0, 1):
            return buoc

def fibonacci_mod(n, m):
    """Tính F_n mod m bằng cách rút gọn chỉ số theo chu kỳ Pisano."""
    n_rut_gon = n % chu_ky_pisano(m)
    a, b = 0, 1
    for _ in range(n_rut_gon):
        a, b = b, (a + b) % m
    return a

print("Câu 1:", fibonacci_mod(10**6, 10))               # chữ số tận cùng
print("Câu 2:", str(fibonacci_mod(10**9, 100)).zfill(2)) # hai chữ số tận cùng
```

**Kết quả (đã kiểm chứng):**

```
Chu kỳ Pisano mod 10  = 60      →  10^6 mod 60  = 40,  F_40  = 102334155
Chu kỳ Pisano mod 100 = 300     →  10^9 mod 300 = 100, F_100 = ...915075
Câu 1: 5
Câu 2: 75
```

**Đáp số chấm tự động:** Câu 1: `5` — Câu 2: `75`.

### Câu 3 — Chứng minh (tính tuần hoàn thuần túy của Fibonacci mod m)

**Bước 1 — Dãy phải lặp lại (Nguyên lý Dirichlet).** Mỗi số hạng của dãy số dư được quyết định hoàn toàn bởi **cặp hai số hạng liền trước** nó. Số cặp số dư khả dĩ $(F_i \bmod m,\; F_{i+1} \bmod m)$ là hữu hạn: nhiều nhất $m^2$ cặp. Dãy Fibonacci thì vô hạn, nên theo Nguyên lý Dirichlet, tồn tại hai vị trí $i < j$ (với $j - i \le m^2$) sao cho

$$(F_i, F_{i+1}) \equiv (F_j, F_{j+1}) \pmod{m}.$$

Vì công thức truy hồi $F_{n+2} = F_{n+1} + F_n$ chỉ phụ thuộc vào cặp liền trước, hai vị trí có cặp giống nhau sẽ sinh ra toàn bộ phần đuôi giống hệt nhau: dãy tuần hoàn kể từ vị trí $i$ với chu kỳ $T = j - i$.

**Bước 2 — Chu kỳ bắt đầu ngay từ đầu (tính xác định ngược).** Điểm mấu chốt: Fibonacci không chỉ chạy xuôi được mà còn **chạy ngược** được:

$$F_{n-1} = F_{n+1} - F_n.$$

Nghĩa là cặp $(F_n, F_{n+1})$ quyết định duy nhất cặp đứng trước $(F_{n-1}, F_n)$, kể cả khi làm việc với số dư mod $m$. Từ $(F_i, F_{i+1}) \equiv (F_j, F_{j+1})$, áp dụng phép lùi này $i$ lần:

$$(F_{i-1}, F_i) \equiv (F_{j-1}, F_j), \quad \dots, \quad (F_0, F_1) \equiv (F_{j-i}, F_{j-i+1}) \pmod{m}.$$

Vậy cặp xuất phát $(0, 1)$ xuất hiện trở lại tại vị trí $T = j - i$: dãy số dư **tuần hoàn thuần túy** — không có "phần đuôi tiền chu kỳ" — và chu kỳ không vượt quá $m^2$. $\blacksquare$

> **Bài học:** dữ liệu máy tính gợi ý chu kỳ tồn tại; Nguyên lý Dirichlet + tính chạy ngược *chứng minh* nó bắt buộc tồn tại với **mọi** $m$ — điều mà không lượng thí nghiệm nào xác nhận nổi.

---

## Bài 2. Trò chơi Nim và chiến thuật XOR nhị phân

| Lĩnh vực | Đối tượng | Độ khó toán / kỹ thuật / độ mở | Vai trò công cụ |
|---|---|---|---|
| Tổ hợp trò chơi | Lớp 8–9 | ★★★☆☆ / ★★☆☆☆ / ★★★☆☆ | #Tìm_kiếm_Cấu_hình, #Phát_hiện_Quy_luật — hữu ích |

### Đề bài

Hai người chơi lần lượt bốc một số viên sỏi tùy ý (ít nhất 1 viên) từ **một** đống. Ai bốc viên sỏi cuối cùng là người thắng.

- **Câu 1 (Vét cạn).** Với 3 đống sỏi, mỗi đống tối đa 5 viên: in ra **tất cả** các trạng thái $(a, b, c)$ với $a \le b \le c \le 5$ khiến người đi trước **chắc chắn thua** nếu đối thủ chơi tối ưu.
- **Câu 2 (Áp dụng).** Trận đấu thực tế có 3 đống $(13, 17, 30)$ và bạn đi trước. Tìm nước đi đầu tiên tối ưu.
- **Câu 3 (Chứng minh).** Dùng biểu diễn nhị phân, phát biểu và chứng minh định lý về điều kiện cần và đủ của một "trạng thái thua" cho trò chơi Nim tổng quát $k$ đống $(n_1, \dots, n_k)$.

### Lời giải Câu 1–2 (Python)

Câu 1 không cần biết trước lý thuyết nào: chỉ cần định nghĩa đệ quy *"thắng nếu tồn tại một nước đi đẩy đối thủ vào trạng thái thua"* và để máy tính vét cạn.

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def thang(trang_thai):
    """True nếu người ĐẾN LƯỢT thắng khi cả hai bên chơi tối ưu."""
    if sum(trang_thai) == 0:
        return False                        # hết sỏi: người đến lượt đã thua
    for i, dong in enumerate(trang_thai):
        for con_lai in range(dong):         # thử bốc 1..dong viên từ đống i
            moi = list(trang_thai)
            moi[i] = con_lai
            if not thang(tuple(sorted(moi))):
                return True                 # có nước đẩy đối thủ vào thế thua
    return False

# Câu 1: vét cạn mọi trạng thái a <= b <= c <= 5
thua = [(a, b, c) for a in range(6) for b in range(a, 6) for c in range(b, 6)
        if not thang((a, b, c))]
print("Câu 1:", thua)

# Quan sát dữ liệu → giả thuyết: trạng thái thua <=> a XOR b XOR c == 0
print("Giả thuyết XOR:", all(a ^ b ^ c == 0 for a, b, c in thua))

# Câu 2: dùng định lý Bouton (chứng minh ở Câu 3) cho trạng thái lớn
xuat_phat = (13, 17, 30)
s = 13 ^ 17 ^ 30                            # "tổng Nim" của trạng thái
for dong in xuat_phat:
    if dong ^ s < dong:                     # hạ đống này xuống dong^s là nước thắng
        print(f"Câu 2: bốc {dong - (dong ^ s)} viên từ đống {dong}, còn lại {dong ^ s}")
```

**Kết quả (đã kiểm chứng):**

```
Câu 1: [(0,0,0), (0,1,1), (0,2,2), (0,3,3), (0,4,4), (0,5,5), (1,2,3), (1,4,5)]
Giả thuyết XOR: True
Câu 2: bốc 2 viên từ đống 30, còn lại 28    →  trạng thái (13, 17, 28) có XOR = 0
```

**Đáp số chấm tự động:** Câu 1: 8 trạng thái như trên — Câu 2: `bốc 2 viên từ đống 30` (đưa về $(13, 17, 28)$; đây là nước thắng **duy nhất**).

### Câu 3 — Chứng minh (Định lý Bouton, 1901)

**Định lý.** Trạng thái Nim $(n_1, \dots, n_k)$ là **trạng thái thua** cho người đến lượt khi và chỉ khi *tổng Nim* $s = n_1 \oplus n_2 \oplus \dots \oplus n_k = 0$, trong đó $\oplus$ là phép XOR theo từng bit nhị phân.

*Chứng minh.* Ta kiểm tra ba tính chất, rồi kết luận bằng quy nạp theo tổng số sỏi.

**(a) Trạng thái kết thúc có $s = 0$.** Trạng thái $(0, \dots, 0)$ — người đến lượt hết nước đi và đã thua — có tổng XOR bằng $0$.

**(b) Từ $s = 0$, mọi nước đi đều dẫn tới $s' \ne 0$.** Một nước đi thay đúng một đống $n_i$ bằng $n_i' < n_i$. Tổng mới là

$$s' = s \oplus n_i \oplus n_i' = 0 \oplus n_i \oplus n_i' = n_i \oplus n_i'.$$

Vì $n_i' \ne n_i$ nên $n_i \oplus n_i' \ne 0$. Vậy người chơi ở trạng thái cân bằng *bắt buộc* phá vỡ cân bằng.

**(c) Từ $s \ne 0$, luôn tồn tại nước đi dẫn tới $s' = 0$.** Gọi $d$ là **bit cao nhất** của $s$. Vì bit $d$ của $s$ bằng $1$, phải có ít nhất một đống $n_i$ có bit $d$ bằng $1$ (nếu không, XOR tại bit đó đã bằng $0$). Với đống này:

$$n_i' := n_i \oplus s < n_i,$$

bởi vì phép XOR với $s$ đổi bit $d$ của $n_i$ từ $1$ xuống $0$ và chỉ chạm tới các bit thấp hơn $d$. Vậy "hạ đống $n_i$ xuống còn $n_i \oplus s$" là một nước đi hợp lệ, và nó cho

$$s' = s \oplus n_i \oplus n_i' = s \oplus n_i \oplus n_i \oplus s = 0.$$

**Kết luận (quy nạp theo tổng số sỏi).** Nếu $s = 0$: hoặc đã hết sỏi và bạn thua theo (a), hoặc theo (b) mọi nước đi của bạn trao cho đối thủ một trạng thái $s' \ne 0$ với ít sỏi hơn — mà theo giả thiết quy nạp là trạng thái thắng của đối thủ. Nếu $s \ne 0$: theo (c) bạn có nước đi trao cho đối thủ trạng thái $s' = 0$ với ít sỏi hơn — trạng thái thua của họ. $\blacksquare$

*Áp dụng cho Câu 2:* $13 \oplus 17 \oplus 30 = 2 \ne 0$ nên người đi trước thắng; nước duy nhất đưa tổng Nim về $0$ là $30 \to 30 \oplus 2 = 28$.

> **Bài học:** máy tính vét cạn được bảng 5×5×5 nhưng bất lực trước $(13, 17, 30)$ nếu không có lý thuyết; ngược lại, chính bảng vét cạn nhỏ là nơi giả thuyết XOR lộ diện. Thực nghiệm và chứng minh nương tựa nhau.

---

## Bài 3. Định lý Pick — diện tích trên lưới ô vuông

| Lĩnh vực | Đối tượng | Độ khó toán / kỹ thuật / độ mở | Vai trò công cụ |
|---|---|---|---|
| Hình học lưới | Lớp 8–9 | ★★★☆☆ / ★★☆☆☆ / ★★★☆☆ | #Quan_sát, #Phát_hiện_Quy_luật — hữu ích |

### Đề bài

Một *đa giác nguyên* là đa giác có mọi đỉnh nằm trên các điểm nguyên của lưới ô vuông. Gọi $I$ là số điểm nguyên nằm **hẳn bên trong** đa giác và $B$ là số điểm nguyên nằm **trên biên**.

- **Câu 1 (Thực nghiệm).** Đếm $I$ và $B$ của tam giác vuông $O(0,0)$, $A(6,0)$, $B(0,8)$.
- **Câu 2 (Phát hiện).** Sinh 20 đa giác nguyên khác nhau; với mỗi đa giác tính diện tích $S$ bằng công thức Shoelace (Gauss) và đếm $I$, $B$. Tìm hằng số $k$ trong hệ thức $S = I + k \cdot B - 1$.
- **Câu 3 (Chứng minh).** Chứng minh Định lý Pick cho mọi đa giác nguyên bằng phương pháp "cắt–ghép": trước hết giải thích vì sao định lý đúng với *tam giác cơ sở* (tam giác nguyên không chứa điểm nguyên nào khác ngoài 3 đỉnh), sau đó chứng minh công thức **cộng được** khi ghép hai đa giác.

### Lời giải Câu 1–2 (Python)

```python
from math import gcd
import random

def dien_tich_shoelace(dinh):
    """Diện tích đa giác theo công thức Gauss, đỉnh liệt kê theo thứ tự trên biên."""
    n = len(dinh)
    tong = sum(dinh[i][0] * dinh[(i+1) % n][1] - dinh[(i+1) % n][0] * dinh[i][1]
               for i in range(n))
    return abs(tong) / 2

def dem_bien(dinh):
    """Số điểm nguyên trên biên: cạnh có vectơ (dx, dy) đóng góp gcd(|dx|, |dy|) điểm."""
    n = len(dinh)
    return sum(gcd(abs(dinh[(i+1) % n][0] - dinh[i][0]),
                   abs(dinh[(i+1) % n][1] - dinh[i][1])) for i in range(n))

def dem_trong(dinh):
    """Đếm điểm nguyên nằm hẳn bên trong (đa giác lồi): mọi tích có hướng cùng dấu."""
    def trong(p):
        dau = []
        for i in range(len(dinh)):
            (x1, y1), (x2, y2) = dinh[i], dinh[(i+1) % len(dinh)]
            d = (x2-x1) * (p[1]-y1) - (y2-y1) * (p[0]-x1)
            if d == 0:
                return False                 # trên biên thì không tính
            dau.append(d > 0)
        return all(dau) or not any(dau)
    xs, ys = [p[0] for p in dinh], [p[1] for p in dinh]
    return sum(trong((x, y)) for x in range(min(xs), max(xs) + 1)
                              for y in range(min(ys), max(ys) + 1))

# Câu 1: tam giác O(0,0), A(6,0), B(0,8)
tg = [(0, 0), (6, 0), (0, 8)]
print("Câu 1: I =", dem_trong(tg), " B =", dem_bien(tg), " S =", dien_tich_shoelace(tg))

# Câu 2: 20 đa giác lồi nguyên ngẫu nhiên (bao lồi của các điểm ngẫu nhiên)
def bao_loi(diem):
    diem = sorted(set(diem))
    def nua(day):
        ch = []
        for p in day:
            while len(ch) >= 2 and \
                  (ch[-1][0]-ch[-2][0]) * (p[1]-ch[-2][1]) - \
                  (ch[-1][1]-ch[-2][1]) * (p[0]-ch[-2][0]) <= 0:
                ch.pop()
            ch.append(p)
        return ch
    return nua(diem)[:-1] + nua(diem[::-1])[:-1]

random.seed(2026)
for _ in range(20):
    dinh = bao_loi([(random.randint(0, 15), random.randint(0, 15)) for _ in range(12)])
    S, I, B = dien_tich_shoelace(dinh), dem_trong(dinh), dem_bien(dinh)
    assert (S + 1 - I) / B == 0.5            # k luôn bằng 1/2
print("Câu 2: k = 0.5 cho cả 20 đa giác  →  S = I + B/2 - 1")
```

**Kết quả (đã kiểm chứng):**

```
Câu 1: I = 17  B = 16  S = 24.0        (kiểm tra: 17 + 16/2 - 1 = 24 ✓)
Câu 2: k = 0.5 cho cả 20 đa giác  →  S = I + B/2 - 1
```

**Đáp số chấm tự động:** Câu 1: `I = 17, B = 16` — Câu 2: `k = 0.5` (Định lý Pick: $S = I + \frac{B}{2} - 1$).

### Câu 3 — Chứng minh (Định lý Pick)

Đặt $P(Đ) := I + \frac{B}{2} - 1$ cho đa giác nguyên $Đ$. Ta cần chứng minh $S(Đ) = P(Đ)$.

**Bước 1 — Tam giác cơ sở.** Một *tam giác cơ sở* có $I = 0$, $B = 3$, nên công thức Pick dự đoán $S = 0 + \frac{3}{2} - 1 = \frac{1}{2}$. Ta chứng minh diện tích của nó đúng bằng $\frac{1}{2}$: Lấy tam giác cơ sở $T$ với các đỉnh $A, B, C$. Lấy đối xứng $T$ qua trung điểm của cạnh $BC$ ta được tam giác $T'$; hợp $T \cup T'$ là hình bình hành $H$ có đỉnh nguyên và — do phép đối xứng tâm qua một điểm nửa nguyên biến lưới điểm nguyên thành chính nó — $H$ cũng không chứa điểm nguyên nào ngoài 4 đỉnh. Các bản dịch chuyển của $H$ theo hai vectơ cạnh của nó **lát kín mặt phẳng**, và mỗi bản sao "sở hữu" đúng một điểm nguyên (một đỉnh). Mật độ điểm nguyên trên mặt phẳng là $1$ điểm trên mỗi đơn vị diện tích, nên diện tích của $H$ bằng $1$, suy ra $S(T) = \frac{1}{2}$. Vậy công thức đúng cho mọi tam giác cơ sở.

**Bước 2 — Tính cộng được của công thức Pick.** Giả sử đa giác $Đ$ được ghép từ hai đa giác nguyên $Đ_1, Đ_2$ dán với nhau dọc theo một đường gấp khúc chung chứa $e$ điểm nguyên (kể cả hai đầu mút). Khi ghép:

- Diện tích cộng lại: $S = S_1 + S_2$.
- $e - 2$ điểm nguyên nằm giữa đường dán chuyển từ "biên" thành "trong": $I = I_1 + I_2 + (e - 2)$.
- Điểm biên: các điểm giữa của đường dán bị đếm ở cả $B_1$ lẫn $B_2$ rồi biến mất khỏi biên, hai đầu mút bị đếm hai lần nhưng vẫn ở lại biên: $B = B_1 + B_2 - 2(e - 2) - 2$.

Do đó:

$$P(Đ_1) + P(Đ_2) = (I_1 + I_2) + \frac{B_1 + B_2}{2} - 2 = \big(I - (e-2)\big) + \frac{B + 2(e-2) + 2}{2} - 2 = I + \frac{B}{2} - 1 = P(Đ).$$

Vậy nếu công thức Pick đúng cho $Đ_1$ và $Đ_2$ thì nó đúng cho $Đ$ (và ngược lại: đúng cho $Đ$ và một mảnh thì đúng cho mảnh còn lại).

**Bước 3 — Kết luận bằng quy nạp.** Mọi đa giác nguyên đều tam giác phân được (quy nạp theo số đỉnh: một đa giác có $\ge 4$ đỉnh luôn có đường chéo nằm hoàn toàn bên trong, cắt nó thành hai đa giác nhỏ hơn). Mỗi tam giác nguyên lại chia nhỏ tiếp được thành các tam giác cơ sở (quy nạp theo số điểm nguyên chứa trong nó: còn điểm nào ngoài 3 đỉnh thì nối điểm đó với các đỉnh để tách nhỏ). Áp dụng Bước 1 cho từng mảnh cơ sở rồi ghép dần lại bằng Bước 2, ta được $S(Đ) = P(Đ)$ cho mọi đa giác nguyên. $\blacksquare$

> **Bài học:** máy tính phát hiện hệ số $k = \frac{1}{2}$ trong vài giây, nhưng câu hỏi "vì sao lại là $\frac{1}{2}$ với **mọi** đa giác?" chỉ có cắt–ghép và quy nạp trả lời được.

---

# PHẦN II — BA CUỘC ĐIỀU TRA CHO THPT (HS)

*Tiêu chí: tư duy thuật toán có ý thức về độ phức tạp; toán học nâng cao hơn — hàm sinh, giới hạn giải tích, hình học tính toán.*

---

## Bài 4. Phân hoạch số nguyên và Đồng nhất thức Euler

| Lĩnh vực | Đối tượng | Độ khó toán / kỹ thuật / độ mở | Vai trò công cụ |
|---|---|---|---|
| Tổ hợp | Lớp 10–12 | ★★★★☆ / ★★★☆☆ / ★★★☆☆ | #Kiểm_chứng, #So_sánh_Phương_pháp — gần như thiết yếu |

### Đề bài

Một *phân hoạch* của số nguyên dương $n$ là cách viết $n$ thành tổng các số nguyên dương, không kể thứ tự.

- **Câu 1 (Quy hoạch động).** Tính số phân hoạch của $n = 60$. (Đệ quy vét cạn sẽ quá chậm — hãy tìm thuật toán $O(n^2)$.)
- **Câu 2 (Đối chiếu).** Với $n = 100$, tính và so sánh: (a) số phân hoạch của $n$ thành các phần **lẻ**; (b) số phân hoạch của $n$ thành các phần **đôi một khác nhau**.
- **Câu 3 (Chứng minh).** Dùng công cụ **hàm sinh** để chứng minh đẳng thức Euler: với mọi $n$, số phân hoạch của $n$ thành các phần lẻ bằng số phân hoạch của $n$ thành các phần phân biệt.

### Lời giải Câu 1–2 (Python)

```python
def phan_hoach(n, cac_phan):
    """Số cách viết n thành tổng các phần lấy từ 'cac_phan' (dùng lại tùy ý).

    dp[i] = số phân hoạch của i. Duyệt từng phần k một lần theo thứ tự
    đảm bảo không đếm lặp các hoán vị của cùng một phân hoạch. O(n^2).
    """
    dp = [1] + [0] * n
    for k in cac_phan:
        for i in range(k, n + 1):
            dp[i] += dp[i - k]
    return dp[n]

def phan_hoach_phan_biet(n):
    """Như trên nhưng mỗi phần chỉ được dùng TỐI ĐA MỘT LẦN: duyệt i giảm dần."""
    dp = [1] + [0] * n
    for k in range(1, n + 1):
        for i in range(n, k - 1, -1):
            dp[i] += dp[i - k]
    return dp[n]

print("Câu 1: p(60) =", phan_hoach(60, range(1, 61)))
le        = phan_hoach(100, range(1, 101, 2))      # chỉ các phần lẻ 1, 3, 5, ...
phan_biet = phan_hoach_phan_biet(100)
print(f"Câu 2: lẻ(100) = {le},  phân biệt(100) = {phan_biet}")
```

**Kết quả (đã kiểm chứng):**

```
Câu 1: p(60) = 966467
Câu 2: lẻ(100) = 444793,  phân biệt(100) = 444793      ← hai số BẰNG NHAU!
```

**Đáp số chấm tự động:** Câu 1: `966467` — Câu 2: `444793` (cả hai đại lượng).

### Câu 3 — Chứng minh (Đồng nhất thức Euler bằng hàm sinh)

Hàm sinh của số phân hoạch thành các phần **lẻ** (mỗi phần lẻ $2j-1$ được dùng $0, 1, 2, \dots$ lần):

$$O(x) = \prod_{j \ge 1} \frac{1}{1 - x^{2j-1}} = \frac{1}{(1-x)(1-x^3)(1-x^5)(1-x^7)\cdots}$$

Hàm sinh của số phân hoạch thành các phần **phân biệt** (mỗi phần $k$ được dùng $0$ hoặc $1$ lần):

$$D(x) = \prod_{k \ge 1} (1 + x^k) = (1+x)(1+x^2)(1+x^3)(1+x^4)\cdots$$

Dùng hằng đẳng thức $1 + x^k = \dfrac{1 - x^{2k}}{1 - x^k}$ cho từng nhân tử:

$$D(x) = \prod_{k \ge 1} \frac{1 - x^{2k}}{1 - x^k} = \frac{(1-x^2)(1-x^4)(1-x^6)(1-x^8)\cdots}{(1-x)(1-x^2)(1-x^3)(1-x^4)\cdots}$$

Tử số gồm đúng các nhân tử $(1 - x^{2k})$ với **mũ chẵn**; chúng triệt tiêu toàn bộ các nhân tử mũ chẵn ở mẫu số. Sau khi giản ước, mẫu số chỉ còn lại các nhân tử **mũ lẻ**:

$$D(x) = \frac{1}{(1-x)(1-x^3)(1-x^5)(1-x^7)\cdots} = O(x).$$

Hai chuỗi lũy thừa hình thức bằng nhau thì mọi hệ số bằng nhau: hệ số của $x^n$ trong $O(x)$ (số phân hoạch thành phần lẻ) bằng hệ số của $x^n$ trong $D(x)$ (số phân hoạch thành phần phân biệt), với mọi $n$. $\blacksquare$

*Ghi chú kỹ thuật:* mọi biến đổi ở trên diễn ra trong vành chuỗi lũy thừa hình thức: hệ số của $x^n$ chỉ phụ thuộc hữu hạn nhân tử đầu, nên việc "giản ước vô hạn" là hợp lệ. Một chứng minh thay thế đẹp không kém là xây **song ánh**: tách mỗi phần chẵn $2^a \cdot l$ ($l$ lẻ) thành $2^a$ bản sao của $l$ — học sinh giỏi nên thử cả hai con đường.

> **Bài học:** máy tính làm học sinh *kinh ngạc* rằng hai cách đếm khác hẳn nhau cho cùng một dãy số; hàm sinh biến sự kinh ngạc đó thành một đẳng thức tất yếu chỉ bằng vài dòng đại số.

---

## Bài 5. Phân bố số nguyên tố và Định lý Số nguyên tố

| Lĩnh vực | Đối tượng | Độ khó toán / kỹ thuật / độ mở | Vai trò công cụ |
|---|---|---|---|
| Số học – Giải tích | Lớp 11–12 | ★★★★☆ / ★★★☆☆ / ★★☆☆☆ | #Quan_sát, #Kiểm_chứng — gần như thiết yếu |

### Đề bài

Gọi $\pi(x)$ là số các số nguyên tố không vượt quá $x$.

- **Câu 1 (Sàng tối ưu).** Viết Sàng Eratosthenes đủ nhanh để tính $\pi(10^8)$.
- **Câu 2 (Giới hạn).** Tính tỷ số $R(x) = \dfrac{\pi(x)}{x / \ln x}$ tại $x = 10^4, 10^5, 10^6, 10^7, 10^8$. Dãy này có xu hướng gì?
- **Câu 3 (Vận dụng lý thuyết).** Phát biểu Định lý Số nguyên tố. Từ đó ước lượng **số chữ số** (trong hệ thập phân) của số nguyên tố thứ $10^{12}$ (một nghìn tỷ).

### Lời giải Câu 1–2 (Python)

```python
from math import isqrt, log

def sang_eratosthenes(gioi_han):
    """sang[i] = 1 nếu i là số nguyên tố. Chạy ~15 giây với giới hạn 10^8.

    Hai tối ưu quan trọng: chỉ sàng tới căn bậc hai của giới hạn,
    và đánh dấu bội số bằng phép gán lát cắt (nhanh hơn vòng lặp Python thuần).
    """
    sang = bytearray([1]) * gioi_han
    sang[0] = sang[1] = 0
    for i in range(2, isqrt(gioi_han) + 1):
        if sang[i]:
            sang[i*i::i] = bytearray(len(sang[i*i::i]))
    return sang

sang = sang_eratosthenes(10**8)
print("Câu 1: pi(10^8) =", sum(sang))

dem, mu = 0, 4
for x in range(2, 10**8):                    # Câu 2: quét một lượt, in tại các mốc
    dem += sang[x]
    if x + 1 == 10**mu:
        print(f"Câu 2: x = 10^{mu}:  pi(x) = {dem:>9}  R(x) = {dem / (10**mu / log(10**mu)):.4f}")
        mu += 1
```

**Kết quả (đã kiểm chứng):**

```
Câu 1: pi(10^8) = 5761455
Câu 2: x = 10^4:  pi(x) =      1229  R(x) = 1.1320
       x = 10^5:  pi(x) =      9592  R(x) = 1.1043
       x = 10^6:  pi(x) =     78498  R(x) = 1.0845
       x = 10^7:  pi(x) =    664579  R(x) = 1.0712
       x = 10^8:  pi(x) =   5761455  R(x) = 1.0613     → giảm chậm dần về 1
```

**Đáp số chấm tự động:** Câu 1: `5761455` — Câu 2: dãy $1.1320,\ 1.1043,\ 1.0845,\ 1.0712,\ 1.0613$ tiến chậm về $1$.

### Câu 3 — Lời giải (Định lý Số nguyên tố và số chữ số của $p_{10^{12}}$)

**Định lý Số nguyên tố (Hadamard – de la Vallée Poussin, 1896).**

$$\lim_{x \to \infty} \frac{\pi(x)}{x / \ln x} = 1.$$

**Hệ quả cho số nguyên tố thứ $n$.** Gọi $p_n$ là số nguyên tố thứ $n$, tức $\pi(p_n) = n$. Thay vào định lý: $n \sim \dfrac{p_n}{\ln p_n}$, suy ra $p_n \sim n \ln p_n$. Lấy lôgarit: $\ln p_n \sim \ln n$ (các hạng bậc thấp hơn không đáng kể), do đó

$$p_n \sim n \ln n.$$

**Áp dụng $n = 10^{12}$:**

$$p_{10^{12}} \approx 10^{12} \cdot \ln(10^{12}) = 10^{12} \cdot 12 \ln 10 \approx 10^{12} \cdot 12 \times 2.302585 \approx 2.76 \times 10^{13}.$$

Số chữ số của số nguyên dương $N$ là $\lfloor \log_{10} N \rfloor + 1$:

$$\log_{10}\left(2.76 \times 10^{13}\right) \approx 13.44 \quad \Rightarrow \quad \lfloor 13.44 \rfloor + 1 = 14 \text{ chữ số}.$$

*Kiểm chứng độc lập:* giá trị thật là $p_{10^{12}} = 29\,996\,224\,275\,833 \approx 3.0 \times 10^{13}$ — đúng **14 chữ số**. Xấp xỉ $n \ln n$ thấp hơn giá trị thật khoảng $8\%$ (xấp xỉ tinh hơn $n(\ln n + \ln \ln n)$ cho $3.03 \times 10^{13}$), nhưng kết luận về số chữ số thì vững chắc. $\blacksquare$

> **Bài học:** dữ liệu từ sàng ($R(x)$ giảm rất chậm: còn cách 1 tới 6% tại $10^8$!) cho học sinh cảm nhận trung thực về tốc độ hội tụ "lười biếng" của PNT — và về việc ngoại suy từ dữ liệu hữu hạn cần lý thuyết dẫn đường.

---

## Bài 6. Bao lồi và phép thử rẽ trái – rẽ phải

| Lĩnh vực | Đối tượng | Độ khó toán / kỹ thuật / độ mở | Vai trò công cụ |
|---|---|---|---|
| Hình học tính toán | Lớp 10–12 | ★★★☆☆ / ★★★★☆ / ★★☆☆☆ | #Tìm_kiếm_Cấu_hình, #Trực_quan_hóa — gần như thiết yếu |

### Đề bài

- **Câu 1 (Khởi động).** Cho 5 điểm $A(0,0)$, $B(4,0)$, $C(0,4)$, $D(2,1)$, $E(1,1)$. Với mỗi điểm, kiểm tra bằng chương trình xem nó có nằm **hẳn bên trong** đa giác lồi tạo bởi các điểm còn lại hay không.
- **Câu 2 (Thuật toán).** Sinh $10\,000$ điểm nguyên ngẫu nhiên (seed cố định `2026`, tọa độ trong $[-10^6, 10^6]$). Cài đặt thuật toán bao lồi $O(n \log n)$ (Graham Scan hoặc Andrew Monotone Chain) và cho biết bao lồi có bao nhiêu đỉnh.
- **Câu 3 (Cơ sở toán học).** Công cụ quyết định của mọi thuật toán bao lồi là **tích có hướng**. Hãy viết công thức định thức kiểm tra "rẽ trái hay rẽ phải" khi đi qua ba điểm liên tiếp $P_1, P_2, P_3$, và **chứng minh** vì sao dấu của định thức đó cho biết hướng rẽ.

### Lời giải Câu 1–2 (Python)

```python
import random

def cross(o, a, b):
    """Tích có hướng của vectơ OA và OB: > 0 rẽ trái, < 0 rẽ phải, = 0 thẳng hàng."""
    return (a[0]-o[0]) * (b[1]-o[1]) - (a[1]-o[1]) * (b[0]-o[0])

def bao_loi(diem):
    """Andrew monotone chain O(n log n): dựng nửa dưới rồi nửa trên của bao lồi."""
    diem = sorted(set(diem))
    def nua(day):
        chuoi = []
        for p in day:
            while len(chuoi) >= 2 and cross(chuoi[-2], chuoi[-1], p) <= 0:
                chuoi.pop()                  # không rẽ trái: loại đỉnh giữa
            chuoi.append(p)
        return chuoi
    return nua(diem)[:-1] + nua(diem[::-1])[:-1]

# Câu 1: điểm nằm hẳn bên trong <=> đi vòng quanh biên luôn thấy nó ở cùng một phía
diem = {'A': (0,0), 'B': (4,0), 'C': (0,4), 'D': (2,1), 'E': (1,1)}
for ten, p in diem.items():
    dinh = bao_loi([q for t, q in diem.items() if t != ten])
    if all(cross(dinh[i], dinh[(i+1) % len(dinh)], p) > 0 for i in range(len(dinh))):
        print(f"Câu 1: {ten}{p} nằm hẳn bên trong")

# Câu 2: bao lồi của 10.000 điểm (seed cố định để có đáp số duy nhất)
random.seed(2026)
n_diem = [(random.randint(-10**6, 10**6), random.randint(-10**6, 10**6))
          for _ in range(10_000)]
print("Câu 2: số đỉnh bao lồi =", len(bao_loi(n_diem)))
```

**Kết quả (đã kiểm chứng):**

```
Câu 1: D(2, 1) nằm hẳn bên trong
Câu 1: E(1, 1) nằm hẳn bên trong
Câu 2: số đỉnh bao lồi = 26
```

**Đáp số chấm tự động:** Câu 1: `D, E` — Câu 2: `26`.

### Câu 3 — Chứng minh (dấu của tích có hướng quyết định hướng rẽ)

Xét ba điểm liên tiếp $P_1(x_1, y_1)$, $P_2(x_2, y_2)$, $P_3(x_3, y_3)$ và hai vectơ dịch chuyển $\vec{u} = \overrightarrow{P_1 P_2}$, $\vec{v} = \overrightarrow{P_2 P_3}$. Đại lượng cần xét là định thức

$$D = \det \begin{pmatrix} x_2 - x_1 & y_2 - y_1 \\ x_3 - x_2 & y_3 - y_2 \end{pmatrix} = (x_2 - x_1)(y_3 - y_2) - (y_2 - y_1)(x_3 - x_2).$$

**Chứng minh ý nghĩa của dấu.** Viết hai vectơ ở dạng lượng giác: $\vec{u} = r_1(\cos\alpha, \sin\alpha)$ và $\vec{v} = r_2(\cos\beta, \sin\beta)$ với $r_1, r_2 > 0$ (độ dài) và $\alpha, \beta$ là góc định hướng của mỗi vectơ so với trục hoành. Khai triển trực tiếp:

$$D = r_1 r_2 (\cos\alpha \sin\beta - \sin\alpha \cos\beta) = r_1 r_2 \sin(\beta - \alpha).$$

Hiệu $\beta - \alpha$ chính là **góc quay** từ hướng đi cũ $\vec{u}$ sang hướng đi mới $\vec{v}$. Vì $r_1 r_2 > 0$, dấu của $D$ trùng với dấu của $\sin(\beta - \alpha)$:

- $D > 0 \iff \sin(\beta - \alpha) > 0$: hướng đi quay **ngược chiều kim đồng hồ** — rẽ **trái**. Graham Scan giữ điểm $P_2$ lại trên bao lồi.
- $D < 0$: hướng đi quay **thuận chiều kim đồng hồ** — rẽ **phải**. Điểm $P_2$ bị "bọc vào trong" và bị loại khỏi bao lồi.
- $D = 0$: ba điểm **thẳng hàng**.

Về mặt hình học, $\frac{D}{2}$ chính là **diện tích có dấu** của tam giác $P_1 P_2 P_3$ — dương khi ba đỉnh liệt kê ngược chiều kim đồng hồ. Đây cũng chính là khối cơ bản dựng nên công thức Shoelace ở Bài 3: cùng một định thức, hai vai trò. $\blacksquare$

*Vì sao tính đúng đắn của thuật toán cần điều này:* một đa giác là lồi khi và chỉ khi đi dọc biên ta chỉ rẽ về một phía; phép thử $D$ cho phép duy trì **bất biến** "chuỗi đỉnh hiện tại luôn chỉ rẽ trái" sau mỗi lần thêm điểm — và bất biến đó là toàn bộ linh hồn của chứng minh tính đúng của Graham Scan / Andrew.

> **Bài học:** với tọa độ nguyên, phép thử $D$ là số học **chính xác tuyệt đối** — không sai số. Cùng phép thử đó viết bằng số thực (góc, arctan) có thể cho kết quả sai. Chọn biểu diễn đúng cũng là làm toán.

---

# BÀI BỔ SUNG — MỘT "BẪY NGOẠI SUY" KINH ĐIỂN

*Khung TOML yêu cầu bộ bài thử nghiệm phải chứa ít nhất một bài "đúng trong nhiều trường hợp nhỏ nhưng sai về sau". Sáu bài trên đều thuộc loại "quy luật là thật"; bài thứ bảy này dạy điều ngược lại — và đó là lý do nó được thêm vào bộ mẫu.*

---

## Bài 7. Chia hình tròn của Moser — khi 1, 2, 4, 8, 16 không phải là điều bạn nghĩ

| Lĩnh vực | Đối tượng | Độ khó toán / kỹ thuật / độ mở | Vai trò công cụ |
|---|---|---|---|
| Tổ hợp – Hình học | Lớp 9–12 | ★★★★☆ / ★★★☆☆ / ★★★★☆ | #Săn_tìm_Phản_ví_dụ — **có nguy cơ gây hiểu lầm** nếu chỉ nhìn dữ liệu nhỏ |

### Đề bài

Lấy $n$ điểm trên một đường tròn ở *vị trí tổng quát* (không có ba dây cung nào đồng quy tại một điểm trong), rồi vẽ **tất cả** các dây cung nối từng cặp điểm. Gọi $R(n)$ là số miền mà hình tròn bị chia thành.

- **Câu 1 (Quan sát — nên làm bằng tay trước!).** Vẽ và đếm $R(1), \dots, R(5)$. Bạn đoán $R(6)$ bằng bao nhiêu? Bây giờ hãy vẽ thật cẩn thận (hoặc dùng chương trình) và đếm lại $R(6)$.
- **Câu 2 (Khảo sát chính xác).** Viết chương trình đếm $R(n)$ bằng **hình học chính xác** (số hữu tỉ, không dùng số thực) cho $n$ tới $12$, và tìm công thức đúng của $R(n)$ theo các hệ số nhị thức.
- **Câu 3 (Chứng minh).** Chứng minh công thức $R(n) = \binom{n}{4} + \binom{n}{2} + 1$ bằng công thức Euler cho đồ thị phẳng $V - E + F = 2$.

### Lời giải Câu 1–2 (Python)

```python
from itertools import combinations
from fractions import Fraction
from math import comb

def so_mien(n):
    """Đếm R(n) qua công thức Euler V - E + F = 2, bằng HÌNH HỌC CHÍNH XÁC.

    Đặt điểm thứ i tại (2^i, 4^i) trên parabol y = x^2: các điểm ở vị trí lồi,
    tọa độ hữu tỉ nên mọi phép tính là chính xác tuyệt đối (không sai số float),
    và cấu trúc giao nhau của các dây cung giống hệt như trên đường tròn.
    """
    diem = [(Fraction(2)**i, Fraction(4)**i) for i in range(n)]
    day_cung = list(combinations(diem, 2))

    def giao_trong(d1, d2):
        """Giao điểm chính xác của hai đoạn thẳng nếu chúng cắt nhau hẳn bên trong."""
        (p1, p2), (p3, p4) = d1, d2
        d = (p2[0]-p1[0])*(p4[1]-p3[1]) - (p2[1]-p1[1])*(p4[0]-p3[0])
        if d == 0:
            return None
        t = ((p3[0]-p1[0])*(p4[1]-p3[1]) - (p3[1]-p1[1])*(p4[0]-p3[0])) / d
        u = ((p3[0]-p1[0])*(p2[1]-p1[1]) - (p3[1]-p1[1])*(p2[0]-p1[0])) / d
        if 0 < t < 1 and 0 < u < 1:
            return (p1[0] + t*(p2[0]-p1[0]), p1[1] + t*(p2[1]-p1[1]))
        return None

    giao = [g for d1, d2 in combinations(day_cung, 2)
            if (g := giao_trong(d1, d2)) is not None]
    assert len(giao) == len(set(giao)), "vị trí chưa tổng quát: có 3 dây cung đồng quy"

    I = len(giao)                        # số giao điểm bên trong
    V = n + I                            # đỉnh: n điểm trên biên + I giao điểm
    E = n + len(day_cung) + 2*I          # cạnh: n cung tròn + các dây đã bị chia nhỏ
    return (2 - V + E) - 1               # công thức Euler, trừ miền vô hạn bên ngoài

print("Câu 1: R(1)..R(6) =", [so_mien(n) for n in range(1, 7)])
for n in range(1, 13):                   # Câu 2: đối chiếu công thức tới n = 12
    assert so_mien(n) == comb(n, 4) + comb(n, 2) + 1
print("Câu 2: R(n) = C(n,4) + C(n,2) + 1 khớp hình học chính xác tới n = 12")
```

**Kết quả (đã kiểm chứng):**

```
Câu 1: R(1)..R(6) = [1, 2, 4, 8, 16, 31]        ← KHÔNG phải 32!
Câu 2: R(n) = C(n,4) + C(n,2) + 1 khớp hình học chính xác tới n = 12
```

**Đáp số chấm tự động:** Câu 1: `31` — Câu 2: $R(n) = \binom{n}{4} + \binom{n}{2} + 1$. (Trớ trêu thay, $R(10) = 256$ lại là một lũy thừa của 2 — thuần túy ngẫu nhiên!)

### Câu 3 — Chứng minh (công thức Euler cho đồ thị phẳng)

Các dây cung và cung tròn tạo thành một đồ thị phẳng liên thông. Ta đếm đỉnh $V$, cạnh $E$, miền $F$ (kể cả miền vô hạn bên ngoài) rồi dùng $V - E + F = 2$.

**Đếm giao điểm bên trong.** Hai dây cung cắt nhau hẳn bên trong hình tròn khi và chỉ khi bốn đầu mút của chúng **xen kẽ** trên đường tròn — tức là mỗi bộ 4 điểm trong $n$ điểm sinh ra đúng **một** cặp dây cung cắt nhau (hai "đường chéo" của tứ giác lồi mà 4 điểm đó tạo thành). Vị trí tổng quát bảo đảm các giao điểm này đôi một khác nhau, nên số giao điểm bên trong là

$$I = \binom{n}{4}.$$

**Đếm đỉnh.** $V = n + I = n + \binom{n}{4}$ ($n$ điểm trên biên cộng các giao điểm).

**Đếm cạnh.** Mỗi giao điểm bên trong nằm trên đúng 2 dây cung và **chia mỗi dây thành thêm một đoạn**. Một dây cung chứa $t$ giao điểm bị chia thành $t + 1$ đoạn; cộng trên tất cả $\binom{n}{2}$ dây cung, tổng số lần "nằm trên" là $2I$, nên các dây cung góp $\binom{n}{2} + 2I$ đoạn cạnh. Thêm $n$ cung tròn trên biên:

$$E = n + \binom{n}{2} + 2\binom{n}{4}.$$

**Áp dụng công thức Euler.** Đồ thị liên thông (mọi đỉnh nối về biên qua các dây), nên

$$F = 2 - V + E = 2 - n - \binom{n}{4} + n + \binom{n}{2} + 2\binom{n}{4} = 2 + \binom{n}{2} + \binom{n}{4}.$$

Trừ đi miền vô hạn bên ngoài đường tròn:

$$R(n) = \binom{n}{4} + \binom{n}{2} + 1. \qquad \blacksquare$$

*Kiểm tra lại chuỗi đầu:* $R(5) = 5 + 10 + 1 = 16$ nhưng $R(6) = 15 + 15 + 1 = \mathbf{31}$. Quy luật "gấp đôi" $1, 2, 4, 8, 16$ chỉ là ảo ảnh của dữ liệu nhỏ.

> **Bài học — quan trọng nhất của cả bộ:** năm điểm dữ liệu đầu tiên *gào lên* $2^{n-1}$, và vẫn sai. Kiểm chứng không phải chứng minh. Đây cũng là bài duy nhất mà lời khuyên đúng ở Câu 1 là **đừng vội viết code** — vẽ tay đến $n = 5$ nhanh hơn; nhưng đến lúc cần chắc chắn $R(6) = 31$ (nét vẽ tay dễ đếm sót) và cần loại trừ ba-dây-đồng-quy thì số hữu tỉ chính xác của máy tính trở nên không thể thay thế. Biết *lúc nào* dùng công cụ cũng là nội dung của bài toán.

---

# DÀNH CHO PHỤ HUYNH VÀ NGƯỜI TỔ CHỨC

**Con bạn sẽ học được gì?** Không phải "học thêm lập trình" hay "giải nhanh hơn", mà là những năng lực nền tảng của tư duy khoa học: phát biểu một giả thuyết chính xác từ dữ liệu; phân biệt rành mạch *kiểm chứng* với *chứng minh*; chủ động săn tìm phản ví dụ và trường hợp biên; quyết định có nên dùng công cụ hay không và giải thích được mọi dòng mã mình dùng; và sửa lại niềm tin của mình khi bằng chứng mới xuất hiện. Trong TOML, một cuốn *nhật ký khám phá* ghi lại giả thuyết sai và ngõ cụt được trân trọng không kém một lời giải đúng — vì đó mới là hình ảnh trung thực của toán học đang được tạo ra.

**Cách chấm và vận hành.** Câu 1 và Câu 2 của mỗi bài chấm tự động (nộp một con số hoặc chuỗi ngắn — mọi đáp số đều đã được đội biên tập kiểm chứng độc lập bằng chương trình). Câu 3 nộp bằng ảnh chụp bài chứng minh viết tay; người chấm đối chiếu với các ý tưởng bản chất của lời giải mẫu (Nguyên lý Dirichlet và phép lùi ngược ở Bài 1; tổng XOR ở Bài 2; cắt–ghép ở Bài 3; hàm sinh ở Bài 4; công thức Euler ở Bài 7…). Nhịp phát hành dự kiến trong giai đoạn thử nghiệm: tối đa ba cuộc điều tra mỗi tuần — một bài chính, một bài ngắn, một bài mở rộng tự chọn.

**Về AI và liêm chính học thuật.** Học sinh được phép dùng AI để gợi ý hướng đi hoặc viết mã ban đầu, với hai điều kiện không nhân nhượng: phải khai báo phạm vi sử dụng trong nhật ký, và phải giải thích được mọi thứ mình nộp. Nhật ký cá nhân mặc định không công khai; không có bảng xếp hạng xây trên sai lầm của học sinh; dữ liệu chỉ được thu thập ở mức cần thiết cho mục tiêu giáo dục.

**Một lời thú nhận có chủ đích.** Bản nháp đầu tiên của chính bộ bài mẫu này chứa nhiều đáp số sai — chúng chỉ bị phát hiện khi được kiểm chứng độc lập bằng chương trình, đúng theo quy trình biên tập mà TOML tự đặt ra cho mình. Chúng tôi giữ lại câu chuyện đó ở đây vì nó chính là bài học trung tâm của toàn bộ dự án: *trong toán học, không ai — kể cả người ra đề, kể cả máy tính, kể cả AI — được miễn trừ khỏi nghĩa vụ kiểm chứng.* Công cụ mở rộng khả năng quan sát và thực nghiệm của người học; trách nhiệm hiểu, kết luận và lập luận vẫn thuộc về con người.

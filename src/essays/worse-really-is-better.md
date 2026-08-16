---
title: "Worse Really is Better"
description: "On outcomes over nerd snipes."
author: "Xander Dunn"
date: 2024-03-19
displayDate: "19 March 2024"
permalink: /worse-really-is-better/index.html
layout: essay.njk
tags: essay
---
In 1991 a now (in)famous essay [The Rise of Worse is Better](https://www.dreamsongs.com/RiseOfWorseIsBetter.html) was published online. Go read it. It's worth it.

The author originally framed Worse is Better in terms of the implementation complexity of programming languages. I'm going to push this concept of "Worse is Better" a bit beyond the author's original intention to make my own point. I'll say the central point of Worse is Better is this:

> The thing that succeeds is the thing that works just well enough to get into the most hands and iterate the fastest. This is both the iteration rate of the thing itself, as well as the iteration rate it enables for the people who are using it.

Here I define success for a technical outcome as having users and solving problems for people. Generally that is going to be the end goal. A business that never has any users won't be a business for long. An open source project that doesn't have any users will stop being maintained. A non-profit that never reaches its target audience has no reason to exist. Even a pure mathematics researcher cares that their paper reaches peers and gains their approval.

#### Examples

-   JavaScript and Node. JavaScript is one of the most successful programming languages ever created. It runs every non-trivial website on the Internet. JavaScript wasn't designed by computer science experts in ivory towers writing out the best formalisms of its day, it was designed by whatever engineers at Netscape could get something working out the door the fastest. It's the quintessential Worse is Better story where the thing that is just good enough to proliferate quickly is the thing that wins. This trend continues throughout the evolution of JavaScript, all the way through today's popular Node.js. The creator of Node.js, Ryan Dahl, abandoned it after listing out many of his regrets in designing it. And yet, Node.js is one of the most successful runtimes ever created. It's a classic Worse is Better. There's a package for everything and it encourages bad code patterns, but it reached a broad audience quickly and allowed fast iteration, so it won. Now Dhal is attempting to atone for his sins by doing things the Better way: he's starting over with [Deno](https://github.com/denoland/deno), an engine that was properly written originally in Go and now in Rust. It's type-safe and does lots of Better things that Node didn't do. But if I were to make a prediction based on Worse is Better, I'd say Deno will likely not gain any significant traction compared to Node because it is prioritizing Better over the fastest iteration to reach the most people.

{% tweet "https://twitter.com/BrendanEich/status/1004425861410402304" %}

-   GPUs and CUDA. GPUs weren't designed for training AI at all. They were designed for playing video games. Early in its existence NVIDIA beat out its competitors by shipping faster and iterating faster. There were more rough spots in their hardware and frameworks, but it got into the hands of video game makers faster and they were able to start iterating with it faster. Developers had to insert all sorts of nasty memory workarounds into their code to get around NVIDIA's warts, but it worked well enough to get things out the door so that's enough for a Worse is Better success. The same is true now with AI. Cerebras and Graphcore are the Better way to do AI training, with giant chips built from the ground up to do sparse operations. But these chips have failed to gain traction while NVIDIA has captured 80% of the entire chip market and become one of the most valuable companies in the world. GPUs didn't even have large matmul cores or high throughput inter-device communication until NVIDIA bolted it on top of the existing hardware in recent years. CUDA, too, is quite the rat's nest. It's extremely low level, has a lot of cruft lying around to support previous generations of hardware, and it's extremely prone to crashes, deadlocks, and memory leaks. And yet, it succeeded where the Better approach has not because it was just good enough, proliferated the fastest, and allowed the fastest iteration loops. NVIDIA is thriving on a Worse is Better success.
-   Tensorflow, Tensorflow 2.0, and PyTorch. Tensorflow 1.0 was designed by experts the Better way, where everything is defined as a graph end-to-end functionally and nothing is run until the end of the universe. This really is the right way to do it, but no one liked developing that way. PyTorch came onto the scene and allowed people to develop models imperatively like most things in Python, and it caught on like wildfire. Now PyTorch has completely displaced Tensorflow as the go-to framework, even for state of the art labs like OpenAI. PyTorch's runtime performance may have been x% slower than Tensorflow, but it greatly increased the iteration rate of the developers who were implementing the experiments, and that was much more important! Tensorflow saw this and attempted to jump on the bandwagon. Tensorflow 2.0 had both a functional and imperative API, but it just ended up being a complex API with the worst of both worlds. PyTorch shows that you don't even have to be first, you just have to be the thing that is good enough for the most people to use. Now Google doesn't even use Tensorflow, they use jax. jax is also a Worse is Better approach. jax noticed that everyone just wants to use numpy, so they made a training framework that enforces the numpy API. jax deals with performance behind the scenes by creating graphs of these imperatively declared operations that are jit-ed, and that will usually work well enough. If Tensorflow had been less Better and more Worse from the start, PyTorch and jax may not have ever needed to exist.
-   Urbit. Urbit is an incredible experiment in Better is Better. It is an attempt to rethink the entire stack from the ground up. Curtis Yarvin looked at the state of computing and realized it's a hopeless stack of crap layered on top of crap, held together by toothpicks and chewing gum. So, let's start from scratch and design the VM, OS, programming language, compiler, networking, etc from ground 0. This immediately pushes all the right nerd snipe zones for me, and indeed I used to own some Urbit stars. This is such a Better approach to computing, but it has mountains to traverse to reach users, gain traction, and solve problems for people. If the whole world just wants to use JavaScript and the nasty Linux kernel full of memory bugs, it's very difficult to replace that with something that only a small number of very technical people can appreciate the Betterness of.
-   Bitcoin is a great example of Worse is Better. It doesn't really work because transaction times are too long, and it lacks every imaginable feature, but it remains by far the largest cryptocurrency by market cap. The thing that wins in blockchain will be the thing that gets into the most hands the fastest and enables people to iterate on the problems they're trying to solve. It's not going to be the perfect algorithm or the world's best proof of byzantine fault tolerance or the 20% more throughput compared to X blockchain.

#### Corollaries

-   Premature \_\_\_\_ is the root of all evil. This quote was made famous by Donald Knuth's _The Art of Computer Programming_ where he filled that blank with "optimization." I would expand this idea and fill in the blank with many areas of technical work, including generalization, security, infrastructure, etc. I've seen startups with 0 users and $0 on the line go full tilt deep fried security with Yubikeys and the works. News flash: No one cares about hacking your startup that has 0 users. This quote is capturing the importance of prioritizing outcomes over doing things Better from the start. Get something mediocre into the most hands the fastest, and then iterate.
-   Iteration rate is extremely important for both technical and business progress, and the fastest way to iterate is generally not to reinvent the wheel or to do everything Better.

{% tweet "https://twitter.com/gdb/status/1546551865881419776" %}

-   Nerd snipes are a good indicator of Better. The type of problems that the smartest people gravitate toward as challenging and intellectually fulfilling are the type of problems that set off my Worse is Better alarm bells. One common example among software engineers is the desire to use the latest and greatest programming language. This is likely a nerd snipe that's scratching an intellectual itch without improving outcomes for business, users, or the world.

![](/assets/worse-really-is-better/65fa1fc38839cbe13d09cf7a_nerd_sniping-4d01fee1.png)

<figcaption>From <a href="https://xkcd.com/356/">XKCD</a></figcaption>

-   Don't confuse activity for outcomes. This phrasing comes from a friend of mine who operated COO level at one of the most successful software companies in the world. It's surprisingly easy to have hundreds of people generating mountains of paperwork and make-work tasks without any useful outcomes. Look at the outcomes of organizations rather than their inputs. As an engineer I can have my head down and feel super productive because of all this work I'm doing and all the beautiful code I'm writing and the green checkmarks in CI, but is it actually moving the needle on an outcome that matters?

![](/assets/worse-really-is-better/65fa328c4f4f3e531a8cd859_Beaurocracy-2-1024x578-658ad4c4.png)

<figcaption>A scene from the dystopic sci-fi movie <em>Brazil</em> where everyone's job is to create paperwork for the sake of paperwork.</figcaption>

-   Do less. Subtract rather than add. There is an interesting set of [findings in psychology](https://timharford.com/2024/03/cautionary-tales-do-nothing-then-do-less/) that humans have a much harder time solving a problem by removing something than by adding many things. Most of your recurring meetings probably fall into this category. Most of the features you're convinced your product must have before you can launch probably fall into this category. The 50% product that proliferates in user hands the fastest is going to succeed over the 100% feature complete product that never sees the light of day. When I was an intern at Apple, Jony Ive gave all of the interns a talk and his primary advice to us was to **focus**. Figuring out everything that _should_ be in a product is easy, removing everything until it's whittled down to something shippable is very difficult.
-   Your implementation doesn't matter, only your API / UI. Your users don't know anything about your implementation. They don't care about your implementation. They probably don't even have the capability to understand anything about your implementation. A user doesn't want to know anything about how the sausage was made, a user wants to solve their own problem.
-   In many ways this article is about a contention between idealism and pragmatism. The idealist wants to do things Better, while the pragmatist is content with Worse so long as it's the path to achieving the end goal the fastest.
-   A "Worse" approach could be thought of as trading a lot of little imperfections for a giant win:

{% tweet "https://x.com/sama/status/1986204243997688184" %}

#### What "Worse is Better" is Not

I spent this whole essay burying the Better approach, but it's important to realize that Worse<----->Better is a long, continuous spectrum, and I am not advocating for the absolute worst of engineering practices. Worse is Better is not about being a lazy, sloppy engineer. It's not about never writing unit tests, never commenting your code, or writing an O(n²) implementation when the O(n) would've been just as simple. There is a very large gamut between "let's rewrite everything in Haskell and make sure no PR is merged unless test coverage is >98%" vs. "let's copy-paste Jupyter notebooks and use email as our revision control system and what even is a unit test?" Be somewhere in the middle.

#### Conclusion

I think the original _Rise of Worse is Better_ article actually didn't go far enough. In the conclusion the author writes:

> A wrong lesson is to take the parable literally and to conclude that C is the right vehicle for AI software. The 50% solution has to be basically right, and in this case it isn’t.

Lisp was everyone's favorite AI language for years around this time. But here we are in 2024 and it turns out CUDA kernels are written in C! So actually C is the right vehicle for AI software, even if it's the janky 50% solution.

As an engineer and technically minded person I still feel the nerd snipe urge. But now rather than eagerly following that signal, I typically view it as a negative signal and steer clear of it. I want to work on things that see the light of day, have users, solve problems, and impact the world. Reinventing the wheel hones my engineering skills and scratches a theoretical itch, but I'd rather be pulling my hair out on a janky system that changed the world than working on a beautiful system no one's ever used.

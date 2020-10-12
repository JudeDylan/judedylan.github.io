---
layout: post
title: "Dip your toe into a little SASS!"
date: 2014-05-22 21:26:43
type: post
tags:
  - Website
  - CMS
  - SASS
---

Ok…I get the whole [CSS pre-processor](http://www.urbaninsight.com/2012/04/12/ten-reasons-you-should-be-using-css-preprocessor) movement; I don’t need convincing of _why_ it is so good.  However, what I do need, is a justification to invest time into learning _yet another_ technology!

There is certainly no lack of resources available, for these little beauty's ([Less](http://lesscss.org/) & [Sass](http://sass-lang.com/)): but then there’s a problem for a start – **_which one_**?  Try [Googling that](https://www.google.co.uk/search?q=less+or+sass), and you will soon discover, many opinions !

In the past, I have ‘tinkered’ with **Less** _(primarily because this was being supported by the excellent_ [_Web Essentials_](http://vswebessentials.com/)_),_ and for the most part, I found it extremely useful.

> _That said, I kept catching myself jumping back into those good old CSS files to make tweaking changes, which sort of defeated the object - old habits and all that!_

To cut a long story short – I recently discovered that Web Essentials, now [supports Sass](http://webessentials.uservoice.com/forums/140520-general/suggestions/3140436-support-for-sass-scss).  Right or wrong, I do get the impression that Sass _slightly_ pips Less to the post _(although I must stress, I’m no authority on the subject)._

As such, I thought I would have a go with Sass.

---

## Creating a base template

Whenever I start any project, I always like to go and get the latest versions of the tools, libraries and frameworks that I will be using – it just helps produce that nice “**fresh start**” feeling.  This could be [Bootstrap](http://getbootstrap.com/), [jQuery](http://jquery.com/), [Font Awesome,](http://fortawesome.github.io/Font-Awesome/) [timeago,](http://timeago.yarp.com/) [CookieBar](http://www.primebox.co.uk/projects/jquery-cookiebar/) or a myriad of other scripts _(either self-written or open source etc)._

> _I also like to build into my templates, appropriate CDN fall-backs; be it jQuery or Bootsrap etc, ensuring the best of both worlds (speed and robustness)._

Part of this setting up process, is also to establish a nice CSS base _([normalise](http://necolas.github.io/normalize.css/)_ _etc)._

## So this is me dipping my toe!

I believe consistency is a prime factor when building websites _(we’ve all seen those earlier CMS driven sites, that allowed for end user ‘**Word Art**’ styling on each page – arghhh!)._

Recently, I have also become extremely aware of the importance of [Style Guides](http://en.wikipedia.org/wiki/Style_guide), especially when it comes to colours and fonts.

This is where Sass _(or indeed Less)_ are brilliant; you can provide a variable name to a colour, and then use that variable throughout your styles – want to change the colour throughout the style sheet? Easy - just change the variable value.

> _You can even lighten or darken the colour by a specific percentage, possibly for a **hover** style, thus ensuring you keep within the boundaries of that base colour theme._

My first recommendation, would be to go and grab a copy of [Color Me SASS](http://richbray.me/cms/) – this in an excellent resource of _established_ colour names and their equivalent hex codes.  This library _(if that is what you call it)_ also demonstrates great use of another brilliant benefit with CSS pre-processors – **modularisation**.

With Sass, you can _(indeed are encouraged)_ to completely separate your files into specific modules responsible for targeted areas of styling – to be fair, you can of course do this with conventional CSS, but it somehow feels ‘_better’_ with Sass.  In the _‘Color Me Sass’_ example, each colour shade type, is split into it’s own Sass style sheet, and then all pulled into one single sheet using [@import](http://sass-lang.com/guide) statements.

> _@import statements are excellent – similar to CSS imports, **except** you end up with one single style sheet – and I don’t need to express the benefits of that, in terms of speed and efficiency!_

---

## Some basic customisation

I chose to add some _small_ additions to the ‘Color Me’ Sass sheet, in order to provide basic percentage shade changes, as below:

```SCSS
    //Colour Lightening 10%
    $blueLighten10:lighten( $blue, 10% );
    $redLighten10:lighten( $red, 10% );
    $greenLighten10:lighten( $green, 10% );

    //Colour Darkening 10%
    $blueDarkening10:darken( $blue, 10% );
    $redDarkening10:darken( $red, 10% );
    $greenDarkening10:darken( $green, 10% );
```

This addition, allowed me to use a 10% colour lightening & darkening, on a cookie bar feature I was using; literally I just entered appropriate variables _(\$greenDarkening10 etc)_ into my ‘CookieBar’ Sass sheet, to style that element – rather than setting a fixed colour.  This way, if I ever need to change the cookie bar styling, I just change the base variable value – perfect reusability!

```SCSS
#cookie-bar .cb-enable {
    background: $greenDarkening10;
}

#cookie-bar .cb-enable:hover {
    background: $green;
}

#cookie-bar .cb-disable {
    background: $red;
}

#cookie-bar .cb-disable:hover {
    background: $redLighten10;
}

#cookie-bar .cb-policy {
    background: $blue;
}

#cookie-bar .cb-policy:hover {
    background: $blueLighten10;
}
```

## Build tool

As I mentioned earlier, I am using the brilliant [Web Essentials tool](http://vswebessentials.com/), which provides a nice automatic compilation of my Sass files to conventional CSS.  All ready for _minification_– of course!

---

## Summary

Sass and Less both contain a ton of amazing features.  Some are extremely simple _(but equally very useful),_ much like the above variable example; whereas others can be vastly complex and quite mind-blowing!

I have come to realise, that you don’t _need_ to be up and running with these more advanced features immediately; just using colour variables alone, can be of huge benefit.

Using these tools, I believe, also encourages the use of important best practices, such as modularisation, design consistency as well as offering component reusability - which is no bad thing.

I for one, am going to make a conscious effort to embrace Sass _(or Less)_ a lot more in the future; it seems foolish not to.

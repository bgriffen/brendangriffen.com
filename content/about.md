---
title: "about."
layout: "page"
url: "/about"
summary: "About"
disableShare: true
showtoc: false
hidemeta: true
comments: false
ShowPostNavLinks: false
ShowBreadCrumbs: false
---

Hi, I'm Brendan. 

I build platform tech at the intersection of biology, engineering and computer science.

I’m currently Chief Technology Officer and co-founder at [Dynomics](https://www.dynomics.com). We're a startup focused on discovering targeted therapies to reverse heart failure using complex *in silico* and *in vitro* systems.

In a past life I studied cosmology and galaxy formation at the Kavli Institute at MIT, leading the [Caterpillar Project](https://www.caterpillarproject.org/), and was a contributor to the [Illustris Project](https://www.illustris-project.org/) at the Center for Astrophysics at Harvard University.

I am based between San Francisco and Brisbane, Australia.

### Interests

- Computational Biology
- Systems & DBTL Engineering
- Astrophysics & Cosmology
- AI & Machine Learning
- Privacy
- Deep Tech
- National Parks

### Experience

* Chief Technology Officer & co-founder @ [Dynomics Inc.](https://dynomics.com) <span style="float:right;">2021 - <i>present</i> </span>
* Chief Technology Officer & co-founder @ Scaled Biolabs Inc. <span style="float:right;">2017 - 2020</span>
* Postdoctoral Scholar, Massachusetts Institute of Technology<span style="float:right;">2013 - 2017</span>

San Francisco accelerators:

* [Boost VC (Tribe 13)](https://www.boost.vc/) &mdash; backing sci-fi founders.
* [Indie Bio (Batch 4)](https://indiebio.co/) &mdash; the world's largest biotech investor.

### Education

* Ph.D. (computational astrophysics), University of Queensland<span style="float:right;">2008 - 2012</span>
* Bachelor of Science (+Hons.), University of Queensland<span style="float:right;">2003 - 2007</span>

### Publications

My full list of publications is available on [Google Scholar](https://scholar.google.com.au/citations?user=ndwtPccAAAAJ&hl=en).

#### Biotechnology

<script id="pub-template-biotech" type="x-tmpl-mustache">
{{#pubsother}}
<li>
    {{authorsFormat}}, {{year}}, <a href="{{url}}"><i>{{title}}</i></a>, {{pub}}.
    {{#codeLink}}<br><small>[<a href="{{codeLink}}">code</a>]</small>{{/codeLink}}
</li>
{{/pubsother}}
{{^pubsother}}
Unable to load publication list.
{{/pubsother}}
</script>

<ul id="publist-biotech"></ul>

#### Astrophysics


<script id="pub-template-astro" type="x-tmpl-mustache">
{{#pubs}}
<li>
    {{authorsFormat}}, {{year}}, <a href="{{url}}"><i>{{title}}</i></a>, {{pub}}.
    {{#codeLink}}<br><small>[<a href="{{codeLink}}">code</a>]</small>{{/codeLink}}
</li>
{{/pubs}}
{{^pubs}}
Unable to load publication list.
{{/pubs}}
</script>

<ul id="publist-astro"></ul>

<!-- Added code-template tag -->
<script id="code-template" type="x-tmpl-mustache">
{{#codes}}
<li>
    <a href="{{url}}">{{repo}}</a>
    {{#description}} - {{description}}{{/description}}
</li>
{{/codes}}
{{^codes}}
No code available.
{{/codes}}
</script>

<script src="https://unpkg.com/mustache@latest"></script>
<script>
  var codeMap = {
  };

  function formatAuthors(authors) {
    authors = authors.map(author => {
      var tokens = author.split(", ");
      if (tokens.length != 2) return author;
      return tokens[1][0] + ". " + tokens[0];
    });
    if (authors.length == 1) {
      return authors[0];
    } else if (authors.length >= 5) {
      return authors.slice(0, 4).join(", ") + ", et al.";
    }
    return authors.slice(0, authors.length - 1).join(", ") + ", and " + authors[authors.length - 1];
  }

  (() => {
    var codeTemplate = document.getElementById("code-template").innerHTML;
    fetch("https://raw.githubusercontent.com/bgriffen/cv/main/data/repos.json")
      .then(response => response.json())
      .then(data => {
        data = data.data.user.pinnedItems.edges.map(value => value.node);
        var rendered = Mustache.render(codeTemplate, { codes: data });
        document.getElementById("codelist").innerHTML = rendered;
      })
      .catch(() => {
        var rendered = Mustache.render(codeTemplate, { codes: [] });
        document.getElementById("codelist").innerHTML = rendered;
      });

    var pubTemplateastro = document.getElementById("pub-template-astro").innerHTML;
    fetch("https://raw.githubusercontent.com/bgriffen/cv/main/data/pubs.json")
      .then(response => response.json())
      .then(data => {
        // Only first author
        data = data.filter(value => {
          return value.authors[0].startsWith("Griffen") && value.doctype == "article";
        });

        // Format authors
        data = data.map(value => {
          value.authorsFormat = formatAuthors(value.authors);
          value.codeLink = codeMap[value.doi];
          return value;
        });

        var rendered = Mustache.render(pubTemplateastro, { pubs: data });
        document.getElementById("publist-astro").innerHTML = rendered;
      })
      .catch(() => {
        var rendered = Mustache.render(pubTemplateastro, { pubs: [] });
        document.getElementById("publist-astro").innerHTML = rendered;
      });

    var pubTemplatebiotech = document.getElementById("pub-template-biotech").innerHTML;
    fetch("https://raw.githubusercontent.com/bgriffen/cv/main/data/other_pubs.json")
      .then(response => response.json())
      .then(data => {
        // Only first author
        data = data.filter(value => {
          return (value.authors[0].startsWith("Mills") || value.authors[0].startsWith("McNamara")) && value.doctype == "article";
        });

        // Format authors
        data = data.map(value => {
          value.authorsFormat = formatAuthors(value.authors);
          value.codeLink = codeMap[value.doi];
          return value;
        });

        var rendered = Mustache.render(pubTemplatebiotech, { pubsother: data });
        document.getElementById("publist-biotech").innerHTML = rendered;
      })
      .catch(() => {
        var rendered = Mustache.render(pubTemplatebiotech, { pubsother: [] });
        document.getElementById("publist-biotech").innerHTML = rendered;
      });
  })();
</script>
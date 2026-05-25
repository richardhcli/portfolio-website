// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-home",
    title: "home",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-projects",
          title: "Projects",
          description: "A timeline of finished projects I am proud of.",
          section: "Navigation",
          handler: () => {
            
              window.location.href = "/projects/";
            
          },
        },{id: "nav-blog",
          title: "Blog",
          description: "",
          section: "Navigation",
          handler: () => {
            
              window.location.href = "/blog/";
            
          },
        },{id: "nav-about",
          title: "About",
          description: "",
          section: "Navigation",
          handler: () => {
            
              window.location.href = "/about/";
            
          },
        },{id: "nav-cv",
          title: "CV",
          description: "",
          section: "Navigation",
          handler: () => {
            
              window.open("https://drive.google.com/file/d/1nKXqQy7LzwMQU_mMiYjSvF6az85v4pTR/view?usp=drive_link", "_blank");
            
          },
        },{id: "post-ai-journal-1",
        
          title: "AI Journal (1)",
        
        description: "Check in with AI journal functionality",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/AIjournal-1/";
          
        },
      },{id: "news-a-simple-inline-announcement",
          title: 'A simple inline announcement.',
          description: "",
          section: "News",},{id: "news-a-long-announcement-with-details",
          title: 'A long announcement with details',
          description: "",
          section: "News",handler: () => {
              window.location.href = "/news/announcement_2/";
            },},{id: "news-a-simple-inline-announcement-with-markdown-emoji-sparkles-smile",
          title: 'A simple inline announcement with Markdown emoji! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-public-shared-wall",
          title: 'Public shared wall',
          description: "Publicly hosted shared textfile",
          section: "Projects",handler: () => {
              window.location.href = "/projects/public-wall/";
            },},{id: "projects-portfolio-website",
          title: 'Portfolio Website',
          description: "A Jekyll-based portfolio website showcasing projects with a timeline view",
          section: "Projects",handler: () => {
              window.location.href = "/projects/portfolio-website/";
            },},{id: "projects-heartbeat-sensor-using-pure-components",
          title: 'Heartbeat sensor using pure components',
          description: "A successful build for my ECE Lab",
          section: "Projects",handler: () => {
              window.location.href = "/projects/heartbeat-sensor/";
            },},{id: "projects-visualized-neural-network",
          title: 'Visualized neural network',
          description: "28x28 -&gt; 16 -&gt; 16 -&gt; 10 MNIST neural network visualization",
          section: "Projects",handler: () => {
              window.location.href = "/projects/visualized-neural-network/";
            },},{id: "projects-firebase-tutorial-fixes",
          title: 'Firebase tutorial + Fixes',
          description: "Running through &#39;AngularFire web codelab&#39;",
          section: "Projects",handler: () => {
              window.location.href = "/projects/firebase-tutorial/";
            },},{id: "projects-self-statistics-system-v1",
          title: 'Self statistics system v1',
          description: "A prototype for creating an IRL status screen",
          section: "Projects",handler: () => {
              window.location.href = "/projects/selfsys-v1/";
            },},{id: "projects-catapult-hackathon-purdue",
          title: 'Catapult Hackathon @ Purdue',
          description: "Creating a agentic machine learning framework",
          section: "Projects",handler: () => {
              window.location.href = "/projects/catapult-hackathon/";
            },},{id: "projects-nook",
          title: 'Nook',
          description: "Winner of Claude Hackathon",
          section: "Projects",handler: () => {
              window.location.href = "/projects/nook-hackathon/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("https://drive.google.com/file/d/1nKXqQy7LzwMQU_mMiYjSvF6az85v4pTR/view?usp=drive_link", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%72%69%63%68%61%72%64%68%63%6C%69@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/richardhcli", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/richardhcli", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },];

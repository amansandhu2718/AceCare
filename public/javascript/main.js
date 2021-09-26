const burger = document.getElementById("burger");
const lineone = document.getElementById("l1");
const linetwo = document.getElementById("l2");
const linethree = document.getElementById("l3");

const slider = document.getElementById("slider");
burger.addEventListener("click", () => {
  slider.classList.toggle("slideropen");
  document.body.classList.toggle("bodyy");
  lineone.classList.toggle("l11");
  linetwo.classList.toggle("l22");
  linethree.classList.toggle("l33");
});

// Animation
gsap.registerPlugin(ScrollTrigger);
// gsap.from(".indeximg", {
//   scrollTrigger: {
//     trigger: ".indeximg",
//     start: "top 90%",
//     end: "top 75%",
//     toggleActions: "play play reverse none ",
//   },
//   duration: 0.5,
//   ease:
//     'ease: CustomEase.create("custom", "M0,0 C0.104,0.204 0.152,1.118 1,0.986 ")',
//   x: 0,
//   scale: 0,
//   autoAlpha: 0,
// });

gsap.from(".mtext", {
  scrollTrigger: {
    trigger: ".mtext",
    start: "top 90%",
    end: "top 75%",
    toggleActions: "play play reverse none ",
  },
  duration: 0.5,
  ease: 'ease: CustomEase.create("custom", "M0,0 C0.104,0.204 0.152,1.118 1,0.986 ")',
  x: 200,
  autoAlpha: 0,
  stagger: 0.15,
});
gsap.from(".anim", {
  scrollTrigger: {
    trigger: ".anim",
    start: "top 60%",
    end: "top 75%",
    toggleActions: "play play reverse none ",
  },
  duration: 0.5,
  ease: 'ease: CustomEase.create("custom", "M0,0 C0.104,0.204 0.152,1.118 1,0.986 ")',
  x: -200,
  autoAlpha: 0,
  stagger: 0.1,
});
gsap.from(".anim2", {
  scrollTrigger: {
    trigger: ".anim2",
    start: "top 80%",
    end: "top 90%",
    toggleActions: "play play reverse none ",
  },
  duration: 0.5,
  ease: 'ease: CustomEase.create("custom", "M0,0 C0.104,0.204 0.152,1.118 1,0.986 ")',
  x: 300,
  autoAlpha: 0,
  stagger: 0.2,
});

import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({selector:'app-root',standalone:true,imports:[RouterLink,RouterLinkActive,RouterOutlet],template:`
<header><div class="container"><h1>CyberStudy</h1><p>Cybersecurity Learning Tracker · Milestone 2</p>
<nav aria-label="Main navigation"><a routerLink="/topics" routerLinkActive="active">Study Topics</a><a routerLink="/labs" routerLinkActive="active">Lab Tracker</a><a routerLink="/resources" routerLinkActive="active">Learning Resources</a></nav></div></header>
<main class="container"><router-outlet /></main>`})
export class App {}

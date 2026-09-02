import { Injectable, signal } from '@angular/core';
import { InterviewQuestion, TopicCategory } from '../models/interview.models';
import { JAVA_TOPIC, JAVA_QUESTIONS } from '../data/java-data';

@Injectable({
  providedIn: 'root'
})
export class InterviewDataService {

  // Topic categories
  private readonly _topics = signal<TopicCategory[]>([
    // {
    //   slug: 'javascript',
    //   name: 'JavaScript',
    //   type: 'language',
    //   icon: 'js',
    //   description: 'The core scripting language of the web.'
    // },
    // {
    //   slug: 'angular',
    //   name: 'Angular',
    //   type: 'framework',
    //   icon: 'A',
    //   description: 'Platform for building mobile and desktop web applications.'
    // },
    // {
    //   slug: 'typescript',
    //   name: 'TypeScript',
    //   type: 'language',
    //   icon: 'ts',
    //   description: 'Typed superset of JavaScript that compiles to plain JavaScript.'
    // },
    JAVA_TOPIC
  ]);

  // Questions
  private readonly _questions = signal<InterviewQuestion[]>([
    //     {
    //       id: 'js-closure',
    //       topicSlug: 'javascript',
    //       title: 'What is a Closure?',
    //       difficulty: 'Intermediate',
    //       theoreticalAnswer: [
    //         'A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).',
    //         'In other words, a closure gives you access to an outer function\'s scope from an inner function.',
    //         'Closures are created every time a function is created, at function creation time.'
    //       ],
    //       primaryApproach: {
    //         title: 'Basic Closure Example',
    //         description: 'A function that returns another function, keeping access to the outer function\'s variables.',
    //         codeSnippet: {
    //           language: 'javascript',
    //           code: `function makeCounter() {
    //   let count = 0;
    //   return function() {
    //     count++;
    //     return count;
    //   };
    // }

    // const counter = makeCounter();
    // console.log(counter());
    // console.log(counter());`,
    //           output: '1\n2',
    //           explanation: 'The inner function maintains access to the `count` variable even after `makeCounter` has finished executing.'
    //         }
    //       }
    //     },
    //     {
    //       id: 'ang-signals',
    //       topicSlug: 'angular',
    //       title: 'What are Angular Signals?',
    //       difficulty: 'Beginner',
    //       theoreticalAnswer: [
    //         'Angular Signals is a system that granularly tracks how and where your state is used throughout an application.',
    //         'It allows the framework to optimize rendering updates, making applications faster and more responsive.',
    //         'A signal is a wrapper around a value that can notify interested consumers when that value changes.'
    //       ],
    //       primaryApproach: {
    //         title: 'Basic Signal Usage',
    //         description: 'Creating a writable signal and updating it.',
    //         codeSnippet: {
    //           language: 'typescript',
    //           code: `import { signal, computed } from '@angular/core';

    // const count = signal(0);
    // const doubleCount = computed(() => count() * 2);

    // console.log(count()); // 0
    // count.set(1);
    // console.log(doubleCount()); // 2`,
    //           output: '0\n2',
    //           explanation: '`signal()` creates a writable signal. `computed()` creates a read-only signal derived from other signals.'
    //         }
    //       }
    //     },
    ...JAVA_QUESTIONS
  ]);

  readonly topics = this._topics.asReadonly();
  readonly questions = this._questions.asReadonly();

  getQuestionsByTopic(slug: string) {
    return this.questions().filter(q => q.topicSlug === slug);
  }

  getQuestionById(id: string) {
    return this.questions().find(q => q.id === id);
  }

  getTopicBySlug(slug: string) {
    return this.topics().find(t => t.slug === slug);
  }
}

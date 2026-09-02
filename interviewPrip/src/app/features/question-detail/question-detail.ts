import { Component, computed, inject, input, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InterviewDataService } from '../../core/services/interview-data.service';
import { ToolbarService } from '../../core/services/toolbar.service';

@Component({
  selector: 'app-question-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './question-detail.html',
  styleUrl: './question-detail.scss'
})
export class QuestionDetailComponent {
  slug = input.required<string>();
  questionId = input.required<string>();

  private interviewDataService = inject(InterviewDataService);
  private toolbarService = inject(ToolbarService);

  topic = computed(() => this.interviewDataService.getTopicBySlug(this.slug()));
  
  question = computed(() => this.interviewDataService.getQuestionById(this.questionId()));

  constructor() {
    effect(() => {
      const t = this.topic();
      const q = this.question();
      
      if (t && q) {
        this.toolbarService.setTitle(q.title);
        this.toolbarService.setBreadcrumbs([
          { label: 'Home', url: '/' },
          { label: t.name, url: `/topics/${t.slug}` },
          { label: 'Question' }
        ]);
      } else {
        this.toolbarService.clear();
      }
    });
  }

  // Navigation Logic
  allQuestionsInTopic = computed(() => this.interviewDataService.getQuestionsByTopic(this.slug()));

  currentIndex = computed(() => {
    const qList = this.allQuestionsInTopic();
    const qId = this.questionId();
    return qList.findIndex(q => q.id === qId);
  });

  prevQuestion = computed(() => {
    const index = this.currentIndex();
    if (index > 0) {
      return this.allQuestionsInTopic()[index - 1];
    }
    return null;
  });

  nextQuestion = computed(() => {
    const index = this.currentIndex();
    const list = this.allQuestionsInTopic();
    if (index >= 0 && index < list.length - 1) {
      return list[index + 1];
    }
    return null;
  });

  copyCode(code: string) {
    navigator.clipboard.writeText(code).then(() => {
      // Could show a toast notification here
      console.log('Code copied to clipboard');
    });
  }
}

import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InterviewDataService } from '../../core/services/interview-data.service';
import { ToolbarService } from '../../core/services/toolbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class HomeComponent {
  private interviewDataService = inject(InterviewDataService);
  private toolbarService = inject(ToolbarService);
  
  topics = this.interviewDataService.topics;

  constructor() {
    this.toolbarService.clear();
  }

  getQuestionCount(topicSlug: string): number {
    return this.interviewDataService.getQuestionsByTopic(topicSlug).length;
  }
}

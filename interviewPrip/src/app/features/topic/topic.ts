import { Component, computed, inject, input, signal, effect } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { InterviewDataService } from '../../core/services/interview-data.service';
import { ToolbarService } from '../../core/services/toolbar.service';
import { InterviewQuestion } from '../../core/models/interview.models';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './topic.html',
  styleUrl: './topic.scss'
})
export class TopicComponent {
  slug = input.required<string>();
  
  private interviewDataService = inject(InterviewDataService);
  private toolbarService = inject(ToolbarService);

  // Derive topic and questions based on slug input
  topic = computed(() => this.interviewDataService.getTopicBySlug(this.slug()));
  allQuestions = computed(() => this.interviewDataService.getQuestionsByTopic(this.slug()));

  constructor() {
    effect(() => {
      const t = this.topic();
      if (t) {
        this.toolbarService.setTitle(`${t.name} Questions`);
        this.toolbarService.setBreadcrumbs([
          { label: 'Home', url: '/' },
          { label: t.name }
        ]);
      } else {
        this.toolbarService.clear();
      }
    });
  }

  // Filtering state
  searchQuery = signal<string>('');
  selectedDifficulties = signal<string[]>([]);
  availableDifficulties = ['Beginner', 'Intermediate', 'Advanced'];
  isDropdownOpen = signal(false);

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }

  closeDropdown() {
    this.isDropdownOpen.set(false);
  }

  toggleDifficulty(diff: string, event: Event) {
    event.stopPropagation();
    const current = this.selectedDifficulties();
    if (current.includes(diff)) {
      this.selectedDifficulties.set(current.filter(d => d !== diff));
    } else {
      this.selectedDifficulties.set([...current, diff]);
    }
  }

  filteredQuestions = computed(() => {
    const query = this.searchQuery().toLowerCase().trim();
    const diffs = this.selectedDifficulties();
    const qList = this.allQuestions();

    return qList.filter(q => {
      const matchesSearch = query === '' || q.title.toLowerCase().includes(query);
      const matchesDiff = diffs.length === 0 || diffs.includes(q.difficulty);
      return matchesSearch && matchesDiff;
    });
  });
}

import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IWeight } from 'app/shared/model/weight.model';
import { WeightService } from './weight.service';

@Component({
  templateUrl: './weight-delete-dialog.component.html'
})
export class WeightDeleteDialogComponent {
  weight: IWeight;

  constructor(protected weightService: WeightService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.weightService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'weightListModification',
        content: 'Deleted an weight'
      });
      this.activeModal.dismiss(true);
    });
  }
}

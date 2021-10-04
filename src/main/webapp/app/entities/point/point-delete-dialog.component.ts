import { Component } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPoint } from 'app/shared/model/point.model';
import { PointService } from './point.service';

@Component({
  templateUrl: './point-delete-dialog.component.html'
})
export class PointDeleteDialogComponent {
  point: IPoint;

  constructor(protected pointService: PointService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.pointService.delete(id).subscribe(() => {
      this.eventManager.broadcast({
        name: 'pointListModification',
        content: 'Deleted an point'
      });
      this.activeModal.dismiss(true);
    });
  }
}

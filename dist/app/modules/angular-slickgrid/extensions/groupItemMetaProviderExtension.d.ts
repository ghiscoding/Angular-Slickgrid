import { Extension } from '../models/index';
import { SharedService } from '../services/shared.service';
export declare class GroupItemMetaProviderExtension implements Extension {
    private sharedService;
    private _extension;
    constructor(sharedService: SharedService);
    dispose(): void;
    /** register the group item metadata provider to add expand/collapse group handlers */
    register(): any;
}

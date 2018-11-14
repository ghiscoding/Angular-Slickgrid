import { Extension } from '../models/index';
import { ExtensionUtility } from './extensionUtility';
import { SharedService } from '../services/shared.service';
export declare class HeaderButtonExtension implements Extension {
    private extensionUtility;
    private sharedService;
    private _eventHandler;
    private _extension;
    constructor(extensionUtility: ExtensionUtility, sharedService: SharedService);
    dispose(): void;
    register(): any;
}

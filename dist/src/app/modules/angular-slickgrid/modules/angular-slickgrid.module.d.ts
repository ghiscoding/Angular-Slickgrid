import { ControlAndPluginService } from '../services/controlAndPlugin.service';
import { ExportService } from '../services/export.service';
import { FilterService } from './../services/filter.service';
import { GridOdataService } from './../services/grid-odata.service';
import { GridOption } from './../models/gridOption.interface';
import { GridEventService } from './../services/gridEvent.service';
import { GridExtraService } from '../services/gridExtra.service';
import { GraphqlService } from './../services/graphql.service';
import { OdataService } from './../services/odata.service';
import { ResizerService } from './../services/resizer.service';
import { SortService } from './../services/sort.service';
export declare class AngularSlickgridModule {
    static forRoot(config?: GridOption): {
        ngModule: typeof AngularSlickgridModule;
        providers: (typeof ExportService | typeof FilterService | typeof SortService | typeof GridEventService | typeof GraphqlService | typeof GridExtraService | typeof OdataService | typeof GridOdataService | typeof ResizerService | typeof ControlAndPluginService | {
            provide: string;
            useValue: GridOption;
        })[];
    };
}

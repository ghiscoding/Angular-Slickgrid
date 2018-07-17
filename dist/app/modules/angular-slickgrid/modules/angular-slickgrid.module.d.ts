import { CollectionService } from './../services/collection.service';
import { FilterFactory } from '../filters/filterFactory';
import { GraphqlService } from './../services/graphql.service';
import { GridOdataService } from './../services/grid-odata.service';
import { GridOption } from './../models/gridOption.interface';
export declare class AngularSlickgridModule {
    static forRoot(config?: GridOption): {
        ngModule: typeof AngularSlickgridModule;
        providers: (typeof CollectionService | typeof FilterFactory | typeof GraphqlService | typeof GridOdataService | {
            provide: string;
            useValue: GridOption;
        })[];
    };
}

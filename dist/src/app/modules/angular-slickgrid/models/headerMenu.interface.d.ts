import { HeaderMenuOnBeforeMenuShowArgs } from './headerMenuOnBeforeMenuShowArgs.interface';
import { HeaderButtonOnCommandArgs } from './headerButtonOnCommandArgs.interface';
export interface HeaderMenu {
    buttonCssClass?: string;
    buttonImage?: string;
    onBeforeMenuShow?: (e: Event, args: HeaderMenuOnBeforeMenuShowArgs) => void;
    onCommand?: (e: Event, args: HeaderButtonOnCommandArgs) => void;
}

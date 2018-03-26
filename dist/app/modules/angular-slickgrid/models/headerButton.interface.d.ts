import { HeaderButtonOnCommandArgs } from './headerButtonOnCommandArgs.interface';
export interface HeaderButton {
    buttonCssClass?: string;
    onCommand?: (e: Event, args: HeaderButtonOnCommandArgs) => void;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { SharedService } from '../services/shared.service';
var GroupItemMetaProviderExtension = /** @class */ (function () {
    function GroupItemMetaProviderExtension(sharedService) {
        this.sharedService = sharedService;
    }
    /**
     * @return {?}
     */
    GroupItemMetaProviderExtension.prototype.dispose = /**
     * @return {?}
     */
    function () {
        if (this._extension && this._extension.destroy) {
            this._extension.destroy();
        }
    };
    /** register the group item metadata provider to add expand/collapse group handlers */
    /**
     * register the group item metadata provider to add expand/collapse group handlers
     * @return {?}
     */
    GroupItemMetaProviderExtension.prototype.register = /**
     * register the group item metadata provider to add expand/collapse group handlers
     * @return {?}
     */
    function () {
        if (this.sharedService && this.sharedService.grid) {
            this._extension = this.sharedService.groupItemMetadataProvider || {};
            this.sharedService.grid.registerPlugin(this._extension);
            return this._extension;
        }
        return null;
    };
    GroupItemMetaProviderExtension.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    GroupItemMetaProviderExtension.ctorParameters = function () { return [
        { type: SharedService }
    ]; };
    return GroupItemMetaProviderExtension;
}());
export { GroupItemMetaProviderExtension };
if (false) {
    /**
     * @type {?}
     * @private
     */
    GroupItemMetaProviderExtension.prototype._extension;
    /**
     * @type {?}
     * @private
     */
    GroupItemMetaProviderExtension.prototype.sharedService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vYW5ndWxhci1zbGlja2dyaWQvIiwic291cmNlcyI6WyJhcHAvbW9kdWxlcy9hbmd1bGFyLXNsaWNrZ3JpZC9leHRlbnNpb25zL2dyb3VwSXRlbU1ldGFQcm92aWRlckV4dGVuc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFM0Q7SUFJRSx3Q0FBb0IsYUFBNEI7UUFBNUIsa0JBQWEsR0FBYixhQUFhLENBQWU7SUFBSSxDQUFDOzs7O0lBRXJELGdEQUFPOzs7SUFBUDtRQUNFLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUM5QyxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQzNCO0lBQ0gsQ0FBQztJQUVELHNGQUFzRjs7Ozs7SUFDdEYsaURBQVE7Ozs7SUFBUjtRQUNFLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRTtZQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMseUJBQXlCLElBQUksRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDeEQsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOztnQkFwQkYsVUFBVTs7OztnQkFGRixhQUFhOztJQXVCdEIscUNBQUM7Q0FBQSxBQXJCRCxJQXFCQztTQXBCWSw4QkFBOEI7Ozs7OztJQUN6QyxvREFBd0I7Ozs7O0lBRVosdURBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBFeHRlbnNpb24gfSBmcm9tICcuLi9tb2RlbHMvaW5kZXgnO1xyXG5pbXBvcnQgeyBTaGFyZWRTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2hhcmVkLnNlcnZpY2UnO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgR3JvdXBJdGVtTWV0YVByb3ZpZGVyRXh0ZW5zaW9uIGltcGxlbWVudHMgRXh0ZW5zaW9uIHtcclxuICBwcml2YXRlIF9leHRlbnNpb246IGFueTtcclxuXHJcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzaGFyZWRTZXJ2aWNlOiBTaGFyZWRTZXJ2aWNlKSB7IH1cclxuXHJcbiAgZGlzcG9zZSgpIHtcclxuICAgIGlmICh0aGlzLl9leHRlbnNpb24gJiYgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3kpIHtcclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKiByZWdpc3RlciB0aGUgZ3JvdXAgaXRlbSBtZXRhZGF0YSBwcm92aWRlciB0byBhZGQgZXhwYW5kL2NvbGxhcHNlIGdyb3VwIGhhbmRsZXJzICovXHJcbiAgcmVnaXN0ZXIoKTogYW55IHtcclxuICAgIGlmICh0aGlzLnNoYXJlZFNlcnZpY2UgJiYgdGhpcy5zaGFyZWRTZXJ2aWNlLmdyaWQpIHtcclxuICAgICAgdGhpcy5fZXh0ZW5zaW9uID0gdGhpcy5zaGFyZWRTZXJ2aWNlLmdyb3VwSXRlbU1ldGFkYXRhUHJvdmlkZXIgfHwge307XHJcbiAgICAgIHRoaXMuc2hhcmVkU2VydmljZS5ncmlkLnJlZ2lzdGVyUGx1Z2luKHRoaXMuX2V4dGVuc2lvbik7XHJcbiAgICAgIHJldHVybiB0aGlzLl9leHRlbnNpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9XHJcbn1cclxuIl19
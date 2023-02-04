"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseOrNotFoundInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let ResponseOrNotFoundInterceptor = class ResponseOrNotFoundInterceptor {
    intercept(context, next) {
        return next.handle().pipe(operators_1.map((response) => {
            if (!response) {
                const [req] = context.getArgs();
                throw new common_1.NotFoundException(`Cannot ${req.method} ${req.url}`, 'Not found');
            }
            return response;
        }));
    }
};
ResponseOrNotFoundInterceptor = __decorate([
    common_1.Injectable()
], ResponseOrNotFoundInterceptor);
exports.ResponseOrNotFoundInterceptor = ResponseOrNotFoundInterceptor;
//# sourceMappingURL=response-or-not-found.interceptor.js.map
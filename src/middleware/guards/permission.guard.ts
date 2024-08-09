// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// // import { AdminRepository } from '@/database/repositories';
// // import { PERMISSION_KEY } from '@/common/decorators';

// @Injectable()
// export class PermissionsGuard implements CanActivate {
//   constructor(
//     private readonly reflector: Reflector,
//     // private readonly adminRepository: AdminRepository,
//   ) {}

//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const permissions = this.reflector.get<string[]>(
//       PERMISSION_KEY,
//       context.getHandler(),
//     );
//     if (!permissions) {
//       return true; // no permissions required, allow access
//     }

//     const request = context.switchToHttp().getRequest();
//     const subadminId = request.user.userId; // assuming you have an authenticated user with an id
//     // const role = await this.adminRepository.findAdminById(subadminId);

//     if (!role) {
//       return false; // role not found, deny access
//     }
//     const allowed = permissions.every((permission) => {
//       const [resource, action] = permission.split(':'); //split the string and convert to array e.g user_management:read -> ['user_management', 'read']
//       const resourcePermission = role.permissions.find(
//         (p) => p.resource === resource,
//       );

//       if (!resourcePermission) {
//         return false; // resource not found, deny access
//       }

//       return resourcePermission.actions.includes(action);
//     });

//     return allowed;
//   }
// }

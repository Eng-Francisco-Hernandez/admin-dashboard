import { Role } from "./enums";

export const SCOPES = {
  canCreate: "can-create",
  canEdit: "can-edit",
  canDelete: "can-delete",
  canView: "can-view",
};

export const PERMISSIONS: {
  [key: string]: string[];
} = {
  [Role.Viewer]: [SCOPES.canView],
  [Role.Editor]: [
    SCOPES.canView,
    SCOPES.canEdit,
    SCOPES.canCreate,
    SCOPES.canDelete,
  ],
  '': []
};

import { PERMISSIONS } from "../../data";
import useGetUserRole from "../../hooks/useGetUserRole";
import React from "react";

const hasPermission = ({
  permissions,
  scopes,
}: {
  permissions: string[];
  scopes: string[];
}) => {
  const scopesMap: {
    [key: string]: boolean;
  } = {};
  scopes.forEach((scope: string) => {
    scopesMap[scope] = true;
  });
  return permissions.some((permission: string) => scopesMap[permission]);
};

export default function PermissionsGate({
  children,
  RenderError = () => <></>,
  scopes = [],
}: {
  children: React.ReactNode;
  RenderError?: () => JSX.Element;
  scopes: string[];
}) {
  const role: string = useGetUserRole();
  const permissions = PERMISSIONS[role];
  const permissionGranted = hasPermission({ permissions, scopes });

  if (!permissionGranted) return <RenderError />;

  return <>{children}</>;
}

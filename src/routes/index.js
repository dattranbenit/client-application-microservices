import React from "react";
import Accounts from "../views/accounts/Accounts";
import AddAccount from "../views/accounts/AddAccount";
import UpdateAccount from "../views/accounts/UpdateAccount";
import Statistic from "../views/statistic/Statistic";

export const routes = [
    {
        path: '/accounts',
        component: Accounts,
        name: "Accounts",
        exact: true
    },
    {
        path: '/account/add',
        component: AddAccount,
        name: "Add Account",
        exact: true
    },
    {
        path: '/account/edit',
        component: UpdateAccount,
        name: "Edit Account",
        exact: true
    },
    {
        path: '/statistics',
        component: Statistic,
        name: "Statistics",
        exact: true
    },
]
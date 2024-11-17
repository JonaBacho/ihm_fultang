
import constate from "constate";
import {useMemo} from "react";


export const [FulltangProvider, useAuthentication] = constate(useLogin, value => value.authMethods)


function useLogin() {



    function renderOne()
    {
        return 1;
    }


    const authMethods = useMemo(() => ({
        renderOne
    }), [renderOne]);
    return {authMethods}
}
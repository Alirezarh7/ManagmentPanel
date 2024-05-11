import React, { useState, useEffect } from 'react';
import NapNoAccessPage from './NapNoAccessPage';
import { IApplicationState } from '../../../store/state';
import { connect } from 'react-redux';

type IProps = IApplicationState & {
    data: {
        service?: string;
        controller?: string;
        action: string;
        withNoAccessPage?: boolean;
    }
    noAccessChildren?: any;
    children?: any;
}

const NapAccessControl = (props: IProps) => {
    const [hasAccess, setHasAccess] = useState<number>(0)
    useEffect(() => {
        if (props.dashboard.userClaims.roles.some(x => x.toLocaleLowerCase() == "OAuthAdminAdministrator".toLocaleLowerCase() || x.toLocaleLowerCase() == "admin".toLocaleLowerCase()))
            setHasAccess(1);
        else if (props.data.service && props.dashboard.userClaims.services.some(x => x.toLocaleLowerCase() == props.data.service?.toLocaleLowerCase()))
            setHasAccess(1);
        else if (props.data.controller && props.dashboard.userClaims.controllers.some(x => x.toLocaleLowerCase() == props.data.controller?.toLocaleLowerCase()))
            setHasAccess(1);
        else if (props.dashboard.userClaims.actions.some(x => x.toLocaleLowerCase() == props.data.action.toLocaleLowerCase()))
            setHasAccess(1);
        else
            setHasAccess(2);
    }, [])
    return (
        <React.Fragment>
            {
                hasAccess == 1 ?
                    props.children
                    :
                    hasAccess == 2 ?
                        props.data.withNoAccessPage ?
                            <NapNoAccessPage />
                            :
                            props.noAccessChildren ?
                                props.noAccessChildren()
                                :
                                ""
                        : ""
            }
        </React.Fragment>
    );
}
export default connect(
    (state: IApplicationState) => state
)(NapAccessControl);
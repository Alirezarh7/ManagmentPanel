import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userManageActions } from '../../Actions/UserManage/action';
import { IUserManageState } from '../../Actions/UserManage/model';
import { GridOptions } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import useGridControl from '../../../../components/general/NapGridControl/NapGridControl';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type IProps = typeof userManageActions & IUserManageState;

const UserManageGrid = (props: IProps) => {
	const history = useNavigate();
	const [t] = useTranslation();
	useEffect(() => {
		props.getUsersList();
	}, []);

	const {
		localeText,
		onGridReady,
		icons,
		defaultColDef,
		textFilterParams,
		numberFilterParams,
		priceValueFormatter,
		sideBarDef,
		statusBar,
		onCellClicked,
		publicContextMenu,
		checkAccessControl
	} = useGridControl();
	const grid: GridOptions = {
		columnDefs: [
			{
				field: 'num',
				headerName: t('rowNumb'),
				sortable: true,
				flex: 1
			},
			{
				field: 'userName',
				headerName: t('userName'),
				sortable: true,
				filter: 'agTextColumnFilter',
				filterParams: textFilterParams,
				flex: 1
			},
			{
				field: 'email',
				headerName: t('email'),
				sortable: true,
				filter: 'agTextColumnFilter',
				filterParams: textFilterParams,
				flex: 1
			},
			{
				field: 'emailConfirmed',
				headerName: t('emailConfirmed'),
				sortable: true,
				filter: 'agTextColumnFilter',
				filterParams: textFilterParams,
				flex: 1,
				enableRowGroup: true,
				enablePivot: true
			},
			{
				field: 'phoneNumber',
				headerName: t('phoneNumber'),
				sortable: true,
				filter: 'agTextColumnFilter',
				filterParams: textFilterParams,
				flex: 1
			},
			{
				field: 'phoneNumberConfirmed',
				headerName: t('phoneNumberConfirmed'),
				sortable: true,
				filter: 'agTextColumnFilter',
				filterParams: textFilterParams,
				flex: 1
			},
			{
				field: 'accessFailedCount',
				headerName: t('accessFailedCount'),
				sortable: true,
				filter: 'agTextColumnFilter',
				filterParams: textFilterParams,
				flex: 1,
				enableRowGroup: true,
				enablePivot: true
			},
			{
				field: 'edit',
				lockPinned: true,
				pinned: 'left'
				/*   cellClass: 'lock-pinned', headerName: t(""), width:40, cellRendererFramework: function (params: any) {
                    return params.value ?
                        <span className="mdi mdi-18px mdi-menu" />
                        : ""
                }*/
			}
		]
	};
	const getContextMenuItems = (params: any) => {
		if (params.value?.hasMenu) {
			var result = [
				{
					name: t('displayInfo'),
					action: function () {
						props.toggleViewUserModal(params.value.item, true);
					},
					icon: '<span class="mdi mdi-18px mdi-monitor" />'
				},
				{
					name: t('edit'),
					action: function () {
						props.toggleUpdateUserModal(params.value.item, true);
					},
					icon: '<span class="mdi mdi-18px mdi-pencil" />'
				},
				{
					name: t('editPass'),
					action: function () {
						props.toggleUpdateUserPassModal(params.value.item.id, true);
					},
					icon: '<span class="mdi mdi-18px mdi-textbox-password" />'
				},
				{
					name: t('clubs'),
					action: function () {
						history('/UserClubs/' + params.value.item.id + '/' + params.value.item.userName);
					},
					icon: '<span class="mdi mdi-18px mdi-lan" />'
				},
				{
					name: t('branches'),
					action: function () {
						history('/UserBranches/' + params.value.item.id + '/' + params.value.item.userName);
					},
					icon: '<span class="mdi mdi-18px mdi-lan" />'
				},
				{
					name: t('userClaims'),
					action: function () {
						history('/user-claims/' + params.value.item.id + '/' + params.value.item.userName);
					},
					icon: '<span class="mdi mdi-18px mdi-vector-selection" />'
				},
				{
					name: t('userRolesManage'),
					action: function () {
						history('/user-roles/' + params.value.item.id + '/' + params.value.item.userName);
					},
					icon: '<span class="mdi mdi-18px mdi-account-star" />'
				},
				{
					name: t('genderAuthorization'),
					action: function () {
						props.closeAllModal();
						props.toggleGenderAuthorizationModal(params.value.item, true);
					},
					icon: '<span class="mdi mdi-18px mdi-account-star" />'
				}
			];
			return result;
		} else if (params.value) return publicContextMenu();
		else return [];
	};
	return (
		<React.Fragment>
			<div className='ag-theme-balham h-100'>
				<AgGridReact
					columnDefs={grid.columnDefs}
					defaultColDef={defaultColDef()}
					rowData={props.usersList.data.map((item: any, i: number) => ({
						num: i + 1,
						userName: item.userName,
						email: item.email,
						emailConfirmed: item.emailConfirmed == true ? t('yes') : t('no'),
						phoneNumber: item.phoneNumber,
						phoneNumberConfirmed: item.phoneNumberConfirmed == true ? t('yes') : t('no'),
						accessFailedCount: item.accessFailedCount,
						edit: { hasMenu: true, item: item }
					}))}
					enableRtl={true}
					pagination={true}
					paginationPageSize={10}
					enableRangeSelection={true}
					sideBar={sideBarDef()}
					statusBar={statusBar()}
					rowGroupPanelShow={'always'}
					suppressMakeColumnVisibleAfterUnGroup={true}
					allowContextMenuWithControlKey={true}
					getContextMenuItems={getContextMenuItems}
					onCellClicked={onCellClicked}
					suppressDragLeaveHidesColumns={true}
					animateRows={true}
					onGridReady={onGridReady}
					icons={icons()}
					localeText={localeText()}
				/>
			</div>
		</React.Fragment>
	);
};
export default connect((state: IApplicationState) => state.userManage, userManageActions)(UserManageGrid as ComponentType);

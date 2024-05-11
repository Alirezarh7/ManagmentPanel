import React, { ComponentType, useEffect } from 'react';
import { connect } from 'react-redux';
import { IApplicationState } from '../../../../store/state';
import { userRoleManageActions } from '../../Actions/UserRoleManage/action';
import { IUserRoleManageState } from '../../Actions/UserRoleManage/model';
import { GridOptions } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import useGridControl from '../../../../components/general/NapGridControl/NapGridControl';
import { useTranslation } from 'react-i18next';

type IProps = typeof userRoleManageActions & IUserRoleManageState & { userId: string };

const UserRoleManageGrid = (props: IProps) => {
	const [t] = useTranslation();
	useEffect(() => {
		props.getUserRolesList(props.userId);
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
				field: 'name',
				headerName: t('title'),
				sortable: true,
				filter: 'agTextColumnFilter',
				filterParams: textFilterParams,
				flex: 3
			},

			{
				field: 'edit',
				lockPinned: true,
				pinned: 'left'
				/* cellClass: 'lock-pinned', headerName: t(""),width:40, flex: 1, cellRendererFramework: function (params: any) {
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
					name: t('remove'),
					action: function () {
						props.toggleDeleteUserRoleModal(props.userId, params.value.id, true);
					},
					icon: '<span class="mdi mdi-18px mdi-delete" />'
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
					rowData={props.userRolesList.data.map((item: any, i: number) => ({
						num: i + 1,
						name: item.name,
						edit: { hasMenu: true, id: item.id }
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
export default connect(
	(state: IApplicationState) => state.userRoleManage,
	userRoleManageActions
)(UserRoleManageGrid as ComponentType<any>);

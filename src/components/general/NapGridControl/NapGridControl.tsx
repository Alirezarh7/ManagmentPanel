import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
//1400/02/16

function useGridControl(): any {
    const [t] = useTranslation()
    function localeText(): any {
        return {
            selectAll: t('selectAll'),
            selectAllSearchResults: t('selectAllSearchResults'),
            searchOoo: t('searchOoo'),
            blanks: t('blanks'),
            noMatches: t('noMatches'),

            // Number Filter & Text Filter
            filterOoo: t('filterOoo'),
            equals: t('equals'),
            notEqual: t('notEqual'),
            empty: t('empty'),

            // Number Filter
            lessThan: t('lessThan'),
            greaterThan: t('greaterThan'),
            lessThanOrEqual: t('lessThanOrEqual'),
            greaterThanOrEqual: t('greaterThanOrEqual'),
            inRange: t('inRange'),
            inRangeStart: t('inRangeStart'),
            inRangeEnd: t('inRangeEnd'),

            // Text Filter
            contains: t('contains'),
            notContains: t('notContains'),
            startsWith: t('startsWith'),
            endsWith: t('endsWith'),

            // Date Filter
            dateFormatOoo: t('dateFormatOoo'),

            // Filter Conditions
            andCondition: t('andCondition'),
            orCondition: t('orCondition'),

            // Filter Buttons
            applyFilter: t('applyFilter'),
            resetFilter: t('resetFilter'),
            clearFilter: t('clearFilter'),
            cancelFilter: t('cancelFilter'),

            // Filter Titles
            textFilter: t('textFilter'),
            numberFilter: t('numberFilter'),
            dateFilter: t('dateFilter'),
            setFilter: t('setFilter'),

            // Side Bar
            columns: t('columns'),
            filters: t('filters'),

            // columns tool panel
            pivotMode: t('pivotMode'),
            groups: t('groups'),
            rowGroupColumnsEmptyMessage: t('rowGroupColumnsEmptyMessage'),
            values: t('values'),
            valueColumnsEmptyMessage: t('valueColumnsEmptyMessage'),
            pivots: t('pivots'),
            pivotColumnsEmptyMessage: t('pivotColumnsEmptyMessage'),

            // Header of the Default Group Column
            group: t('group'),

            // Other
            loadingOoo: t('loadingOoo'),
            noRowsToShow: t('noRowsToShow'),
            enabled: t('enabled'),

            // Menu
            pinColumn: t('pinColumn'),
            pinLeft: t('pinLeft'),
            pinRight: t('pinRight'),
            noPin: t('noPin'),
            valueAggregation: t('valueAggregation'),
            autosizeThiscolumn: t('autosizeThiscolumn'),
            autosizeAllColumns: t('autosizeAllColumns'),
            groupBy: t('groupBy'),
            ungroupBy: t('ungroupBy'),
            resetColumns: t('resetColumns'),
            expandAll: t('expandAll'),
            collapseAll: t('collapseAll'),
            copy: t('copy'),
            ctrlC: t('ctrlC'),
            copyWithHeaders: t('copyWithHeaders'),
            paste: t('paste'),
            ctrlV: t('ctrlV'),
            export: t('export'),
            csvExport: t('csvExport'),
            excelExport: t('excelExport'),

            // Enterprise Menu Aggregation and Status Bar
            sum: t('sum'),
            min: t('min'),
            max: t('max'),
            none: t('none'),
            count: t('count'),
            avg: t('average'),
            filteredRows: t('filtered'),
            selectedRows: t('selected'),
            totalRows: t('totalRows'),
            totalAndFilteredRows: t('totalAndFilteredRows'),
            more: t('more'),
            to: t('to'),
            of: t('of'),
            page: t('page'),
            nextPage: t('nextPage'),
            lastPage: t('lastPage'),
            firstPage: t('firstPage'),
            previousPage: t('previousPage'),

            // Enterprise Menu (Charts)
            pivotChartAndPivotMode: t('pivotChartAndPivotMode'),
            pivotChart: t('pivotChart'),
            chartRange: t('chartRange'),

            columnChart: t('columnChart'),
            groupedColumn: t('groupedColumn'),
            stackedColumn: t('stackedColumn'),
            normalizedColumn: t('normalizedColumn'),

            barChart: t('barChart'),
            groupedBar: t('groupedBar'),
            stackedBar: t('stackedBar'),
            normalizedBar: t('normalizedBar'),

            pieChart: t('pieChart'),
            pie: t('pie'),
            doughnut: t('doughnut'),

            line: t('line'),

            xyChart: t('xyChart'),
            scatter: t('scatter'),
            bubble: t('bubble'),

            areaChart: t('areaChart'),
            area: t('area'),
            stackedArea: t('stackedArea'),
            normalizedArea: t('normalizedArea'),

            histogramChart: t('histogramChart'),

            // Charts
            pivotChartTitle: t('pivotChartTitle'),
            rangeChartTitle: t('rangeChartTitle'),
            settings: t('settings'),
            data: t('data'),
            format: t('format'),
            categories: t('categories'),
            defaultCategory: t('defaultCategory'),
            series: t('series'),
            xyValues: t('xyValues'),
            paired: t('paired'),
            axis: t('axis'),
            navigator: t('navigator'),
            color: t('color'),
            thickness: t('thickness'),
            xType: t('xType'),
            automatic: t('automatic'),
            category: t('category'),
            number: t('number'),
            time: t('time'),
            xRotation: t('xRotation'),
            yRotation: t('yRotation'),
            ticks: t('ticks'),
            width: t('width'),
            height: t('height'),
            length: t('length'),
            padding: t('padding'),
            spacing: t('spacing'),
            chart: t('chart'),
            title: t('title'),
            titlePlaceholder: t('titlePlaceholder'),
            background: t('background'),
            font: t('font'),
            top: t('top'),
            right: t('right'),
            bottom: t('bottom'),
            left: t('left'),
            labels: t('labels'),
            size: t('size'),
            minSize: t('minSize'),
            maxSize: t('maxSize'),
            legend: t('legend'),
            position: t('position'),
            markerSize: t('markerSize'),
            markerStroke: t('markerStroke'),
            markerPadding: t('markerPadding'),
            itemSpacing: t('itemSpacing'),
            itemPaddingX: t('itemPaddingX'),
            itemPaddingY: t('itemPaddingY'),
            layoutHorizontalSpacing: t('layoutHorizontalSpacing'),
            layoutVerticalSpacing: t('layoutVerticalSpacing'),
            strokeWidth: t('strokeWidth'),
            offset: t('offset'),
            offsets: t('offsets'),
            tooltips: t('tooltips'),
            callout: t('callout'),
            markers: t('markers'),
            shadow: t('shadow'),
            blur: t('blur'),
            xOffset: t('xOffset'),
            yOffset: t('yOffset'),
            lineWidth: t('lineWidth'),
            normal: t('normal'),
            bold: t('bold'),
            italic: t('italic'),
            boldItalic: t('boldItalic'),
            predefined: t('predefined'),
            fillOpacity: t('fillOpacity'),
            strokeOpacity: t('strokeOpacity'),
            histogramBinCount: t('histogramBinCount'),
            columnGroup: t('columnGroup'),
            barGroup: t('barGroup'),
            pieGroup: t('pieGroup'),
            lineGroup: t('lineGroup'),
            scatterGroup: t('scatterGroup'),
            areaGroup: t('areaGroup'),
            histogramGroup: t('histogramGroup'),
            groupedColumnTooltip: t('groupedColumnTooltip'),
            stackedColumnTooltip: t('stackedColumnTooltip'),
            normalizedColumnTooltip: t('normalizedColumnTooltip'),
            groupedBarTooltip: t('groupedBarTooltip'),
            stackedBarTooltip: t('stackedBarTooltip'),
            normalizedBarTooltip: t('normalizedBarTooltip'),
            pieTooltip: t('pieTooltip'),
            doughnutTooltip: t('doughnutTooltip'),
            lineTooltip: t('lineTooltip'),
            groupedAreaTooltip: t('groupedAreaTooltip'),
            stackedAreaTooltip: t('stackedAreaTooltip'),
            normalizedAreaTooltip: t('normalizedAreaTooltip'),
            scatterTooltip: t('scatterTooltip'),
            bubbleTooltip: t('bubbleTooltip'),
            histogramTooltip: t('histogramTooltip'),
            noDataToChart: t('noDataToChart'),
            pivotChartRequiresPivotMode: t('pivotChartRequiresPivotMode'),
            chartSettingsToolbarTooltip: t('chartSettingsToolbarTooltip'),
            chartLinkToolbarTooltip: t('chartLinkToolbarTooltip'),
            chartUnlinkToolbarTooltip: t('chartUnlinkToolbarTooltip'),
            chartDownloadToolbarTooltip: t('chartDownloadToolbarTooltip'),

            // ARIA
            ariaHidden: t('ariaHidden'),
            ariaVisible: t('ariaVisible'),
            ariaChecked: t('ariaChecked'),
            ariaUnchecked: t('ariaUnchecked'),
            ariaIndeterminate: t('ariaIndeterminate'),
            ariaColumnSelectAll: t('ariaColumnSelectAll'),
            ariaInputEditor: t('ariaInputEditor'),
            ariaDateFilterInput: t('ariaDateFilterInput'),
            ariaFilterInput: t('ariaFilterInput'),
            ariaFilterColumnsInput: t('ariaFilterColumnsInput'),
            ariaFilterValue: t('ariaFilterValue'),
            ariaFilterFromValue: t('ariaFilterFromValue'),
            ariaFilterToValue: t('ariaFilterToValue'),
            ariaFilteringOperator: t('ariaFilteringOperator'),
            ariaColumnToggleVisibility: t('ariaColumnToggleVisibility'),
            ariaColumnGroupToggleVisibility: t('ariaColumnGroupToggleVisibility'),
            ariaRowSelect: t('ariaRowSelect'),
            ariaRowDeselect: t('ariaRowDeselect'),
            ariaRowToggleSelection: t('ariaRowToggleSelection'),
            ariaRowSelectAll: t('ariaRowSelectAll'),
            ariaSearch: t('ariaSearch'),
            ariaSearchFilterValues: t('ariaSearchFilterValues')
        }
    }
    function onGridReady(params: any): any {
        var gridColumnApi = params.columnApi;
        gridColumnApi.autoSizeColumns();
    }
    function icons(): any {
        return {
            filter: '<i class="mdi mdi-filter"/>'
        }
    }
    function defaultColDef(): any {
        return {
            resizable: true,
            autoHeight: true,
            floatingFilter: true,
        }
    }
    function sideBarDef(): any {
        return {
            toolPanels: [
                {
                    id: 'columns',
                    labelDefault: 'Columns',
                    labelKey: 'columns',
                    iconKey: 'columns',
                    toolPanel: 'agColumnsToolPanel',
                },
                {
                    id: 'filters',
                    labelDefault: 'Filters',
                    labelKey: 'filters',
                    iconKey: 'filter',
                    toolPanel: 'agFiltersToolPanel',
                }
            ],
            // defaultToolPanel: t('columns'),
            hiddenByDefault: false,
            position: 'left'
        }
    }
    function statusBar(): any {
        return {
            statusPanels: [
                {
                    statusPanel: 'agTotalAndFilteredRowCountComponent',
                    align: 'left',
                },
                {
                    statusPanel: 'agTotalRowCountComponent',
                    align: 'center',
                },
                { statusPanel: 'agFilteredRowCountComponent' },
                { statusPanel: 'agSelectedRowCountComponent' },
                { statusPanel: 'agAggregationComponent' },
            ],
        }
    }
    function onCellClicked(params: any): void {
        if (params.value?.hasMenu) {
            const rowIndex = params.rowIndex;
            const rowNode = params.node;
            const column = params.column;
            const mouseEvent = params.event;
            const value = params.value;
            const cell = params.api.context.beanWrappers.rowRenderer.beanInstance.rowCompsByIndex[rowIndex].getRenderedCellForColumn(column);
            cell.beans.contextMenuFactory.showMenu(rowNode, column, value, mouseEvent);
        }
    }
    function publicContextMenu(): any {
        return [
            'export',
            'copy',
            'separator',
            'chartRange',
        ];
    }
    function checkAccessControl(data: { service?: string; controller?: string; action: string; }, claims: any): boolean {
        let hasAccess = true;
        if (claims.roles.some((x: any) => x.toLocaleLowerCase() == "OAuthAdminAdministrator".toLocaleLowerCase() || x.toLocaleLowerCase() == "admin".toLocaleLowerCase()))
            hasAccess = false;
        else if (data.service && claims.services.some((x: any) => x.toLocaleLowerCase() == data.service?.toLocaleLowerCase()))
            hasAccess = false;
        else if (data.controller && claims.controllers.some((x: any) => x.toLocaleLowerCase() == data.controller?.toLocaleLowerCase()))
            hasAccess = false;
        else if (claims.actions.some((x: any) => x.toLocaleLowerCase() == data.action.toLocaleLowerCase()))
            hasAccess = false;
        return hasAccess;
    }
    const textFilterParams = {
        textCustomComparator: (filter: any, value: any, filterText: any) => {
            const filterTextLowerCase = filterText.toLowerCase();
            const valueLowerCase = value.toString().toLowerCase();
            switch (filter) {
                case 'contains':
                    return valueLowerCase.indexOf(filterTextLowerCase) >= 0;
                case 'notContains':
                    return valueLowerCase.indexOf(filterTextLowerCase) === -1;
                case 'equals':
                    return valueLowerCase === filterTextLowerCase;
                case 'notEqual':
                    return valueLowerCase != filterTextLowerCase;
                case 'startsWith':
                    return valueLowerCase.indexOf(filterTextLowerCase) === 0;
                case 'endsWith':
                    var index = valueLowerCase.lastIndexOf(filterTextLowerCase);
                    return index >= 0 && index === (valueLowerCase.length - filterTextLowerCase.length);
                default:
                    return false;
            }
        }
        // ,resetButton: true
        // ,clearButton:true
        // ,applyButton: true
    };
    const numberFilterParams = {
        allowedCharPattern: t('\\d\\-\\,\\$'),
        numberParser: (text: string) => {
            return text == null ? null : parseInt(text.replace(',', ''));
        }
    };
    var priceValueFormatter = function (params: any) {
        return params?.value?.toLocaleString();
    };
    const dateFilterParams = {
        comparator: (filterLocalDateAtMidnight: any, cellValue: any) => {
            const dateAsString = cellValue;

            if (dateAsString == null) {
                return 0;
            }

            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            const dateParts = dateAsString.split('/');
            const day = Number(dateParts[2]);
            const month = Number(dateParts[1]) - 1;
            const year = Number(dateParts[0]);
            const cellDate = new Date(year, month, day);

            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
                return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
                return 1;
            }
            return 0;
        }
    };
    return { localeText, onGridReady, icons, defaultColDef, textFilterParams, numberFilterParams, dateFilterParams, priceValueFormatter, sideBarDef, statusBar, onCellClicked, publicContextMenu, checkAccessControl }
}
export default useGridControl
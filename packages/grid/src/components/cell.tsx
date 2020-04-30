import React from 'react';
import { Alignement, CellValue } from '../models';
import { CELL_CSS_CLASS } from '../constants/cssClassesConstants';

export interface GridCellProps {
  field?: string;
  value?: CellValue;
  formattedValue?: CellValue;
  width: number;
  showRightBorder?: boolean;
  align?: Alignement;
  cssClass?: string;
}

export const Cell: React.FC<GridCellProps> = React.memo(
  ({ value, field, width, children, showRightBorder, align, formattedValue, cssClass }) => {
    let cssClasses = `${CELL_CSS_CLASS} ${cssClass || ''} ${showRightBorder ? 'with-border' : ''}`;

    cssClasses += !align || align === 'left' ? '' : ` ${align}`;

    const valueToRender = formattedValue || value;

    return (
      <div className={cssClasses} data-value={value} data-field={field} style={{ minWidth: width, maxWidth: width }}>
        {children ? children : valueToRender?.toString()}
      </div>
    );
  },
);

Cell.displayName = 'GridCell';

export const LeftEmptyCell: React.FC<{ width?: number }> = React.memo(({ width }) =>
  !width ? null : <Cell key={'empty-col-left'} width={width} />,
);
LeftEmptyCell.displayName = 'LeftEmptyCell';

export const RightEmptyCell: React.FC<{ width?: number }> = React.memo(({ width }) =>
  !width ? null : <Cell key={'empty-col-right'} width={width} />,
);
RightEmptyCell.displayName = 'RightEmptyCell';
// component.spec.ts
import React from 'react';
import Table from '../components/Table';
import { tableProps } from '../../../../cypress/fixtures/table';
import { TimeDateFormat } from '../enums';
import dayjs from 'dayjs';

const TableComponent = () => {
  const [rowsPerPage, setRowsPerPage] = React.useState(4);
  return (
    <Table
      {...tableProps}
      rows={[...tableProps.rows.slice(0, rowsPerPage)]}
      rowsPerPage={rowsPerPage}
      handleChangeRowsPerPage={(
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ): void => setRowsPerPage(+event.target.value)}
    />
  );
};

describe('Table', () => {
  beforeEach(() => {
    cy.mount(<TableComponent />);
  });
  it('should render the header and all columns', () => {
    cy.get('thead').find('tr').should('have.length', 1);
    cy.get('tbody').find('tr').should('have.length', 4);
    cy.get('tbody')
      .find('tr')
      .each((tr) => {
        cy.wrap(tr).find('th').should('have.length', 9);
      });
  });

  it('it should have the correct data displayed', () => {
    cy.get('th').contains('john.doe@example.com').should('exist');
    cy.get('th').contains('987654321').should('exist');
    cy.get('th').contains('Chicago').should('exist');
    cy.get('th')
      .contains(dayjs('2020-07-01').format(TimeDateFormat.timeDate))
      .should('exist');
    cy.get('th')
      .contains(dayjs('1995-02-15').format(TimeDateFormat.timeDate))
      .should('exist');
  });

  it('should contain appropriate buttons', () => {
    cy.get('th').contains('button', 'Edit').should('exist');
    cy.get('th').contains('button', 'Delete').should('exist');
    cy.get('th').contains('button', 'Soft delete').should('exist');
  });

  it('when change the number of rows to 2, it should still contain the first and second elements but not the third and fourth', () => {
    cy.get('select').select('2');
    cy.get('tbody').find('tr').should('have.length', 2);
    cy.get('th').contains('jane.smith@example.com').should('exist');
    cy.get('th').contains('alice.williams@example.com').should('not.exist');
  });
});

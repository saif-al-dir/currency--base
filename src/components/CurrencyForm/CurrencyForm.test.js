import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CurrencyForm from './CurrencyForm';

describe('Component CurrencyForm', () => {
    afterEach(() => {
        cleanup();
    });

    it('should render without crashing', () => {
        render(<CurrencyForm action={() => { }} />);
    });

    const testCases = [
        { amount: '100', from: 'PLN', to: 'USD' },
        { amount: '20', from: 'USD', to: 'PLN' },
        { amount: '200', from: 'PLN', to: 'USD' },
        { amount: '345', from: 'USD', to: 'PLN' },
    ];

    testCases.forEach((testObj) => {
        it(`should run action callback with proper data on form submit (${testObj.amount} ${testObj.from} → ${testObj.to})`, async () => {
            const action = jest.fn();

            render(<CurrencyForm action={action} />);

            const amountField = screen.getByTestId('amount');
            const fromField = screen.getByTestId('from-select');
            const toField = screen.getByTestId('to-select');

            // Clear default value if needed
            userEvent.clear(amountField);
            userEvent.type(amountField, testObj.amount);
            userEvent.selectOptions(fromField, testObj.from);
            userEvent.selectOptions(toField, testObj.to);

            const submitButton = screen.getByText('Convert');
            userEvent.click(submitButton);

            expect(action).toHaveBeenCalledTimes(1);
            expect(action).toHaveBeenCalledWith({
                amount: Number(testObj.amount),
                from: testObj.from,
                to: testObj.to,
            });
        });
    });
});
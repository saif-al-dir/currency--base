import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultBox from './ResultBox';

describe('Component ResultBox', () => {
    afterEach(() => cleanup());

    it('should render without crashing', () => {
        render(<ResultBox from="PLN" to="USD" amount={100} />);
    });

    const plnToUsdCases = [
        { amount: 100, expected: 'PLN 100.00 = $28.57' },
        { amount: 200, expected: 'PLN 200.00 = $57.14' },
        { amount: 345, expected: 'PLN 345.00 = $98.57' },
    ];

    plnToUsdCases.forEach(({ amount, expected }) => {
        it(`should render proper info for PLN -> USD conversion, amount ${amount}`, () => {
            render(<ResultBox from="PLN" to="USD" amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(expected);
        });
    });

    const usdToPlnCases = [
        { amount: 100, expected: '$100.00 = PLN 350.00' },
        { amount: 50, expected: '$50.00 = PLN 175.00' },
    ];

    usdToPlnCases.forEach(({ amount, expected }) => {
        it(`should render proper info for USD -> PLN conversion, amount ${amount}`, () => {
            render(<ResultBox from="USD" to="PLN" amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(expected);
        });
    });

    const sameCurrencyCases = [
        { from: 'PLN', to: 'PLN', amount: 123, expected: 'PLN 123.00 = PLN 123.00' },
        { from: 'USD', to: 'USD', amount: 50, expected: '$50.00 = $50.00' },
    ];

    sameCurrencyCases.forEach(({ from, to, amount, expected }) => {
        it(`should render proper info when converting ${from} to ${to}`, () => {
            render(<ResultBox from={from} to={to} amount={amount} />);
            const output = screen.getByTestId('output');
            expect(output).toHaveTextContent(expected);
        });
    });

    it('should render "Wrong value…" when amount is negative', () => {
        render(<ResultBox from="PLN" to="USD" amount={-100} />);
        const output = screen.getByTestId('output');
        expect(output).toHaveTextContent('Wrong value…');
    });
});
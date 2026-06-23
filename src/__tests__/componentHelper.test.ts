import { fetchComponentsByType, ComponentSearchTerms } from '../utils/componentHelper';
import { supabase } from '../utils/supabase';

jest.mock('../utils/supabase', () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
    ilike: jest.fn().mockReturnThis(),
  },
}));

describe('componentHelper', () => {
  it('fetchComponentsByType returns formatted data', async () => {
    const mockData = [
      { id: '1', nome_produto: 'Processador AMD Ryzen 5', preco_pix: 1200, loja: 'Kabum' },
      { id: '2', nome_produto: 'Processador Intel Core i5', preco_pix: null, loja: 'Pichau' }
    ];

    (supabase.ilike as jest.Mock).mockResolvedValue({ data: mockData, error: null });

    const result = await fetchComponentsByType(ComponentSearchTerms.CPU, '', 0, 20);

    expect(result.data).toHaveLength(1); // One with valid price
    expect(result.data[0].name).toBe('Processador AMD Ryzen 5');
    expect(result.data[0].price).toBe('R$ 1.200,00');
    expect(result.data[0].shop).toBe('Kabum');
    expect(result.hasMore).toBe(false);
  });
});

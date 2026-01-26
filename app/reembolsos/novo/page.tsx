'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NovoReembolso() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [formData, setFormData] = useState({
    atribuido: '',
    data: '',
    processo: '',
    upm: '',
    beneficiario: '',
    requerente: '',
    solicitado: '',
    cpfTitular: '',
    distribuicao: '',
    conformidade: '',
    peg: '',
    especialidade: '',
    decisao: '',
    resultado: '',
    pagamento: '',
    ob: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setCarregando(true);
    setErro('');

    try {
      const response = await fetch('/api/reembolsos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Erro ao criar reembolso');
      }

      const novoReembolso = await response.json();
      router.push(`/reembolsos/${novoReembolso.id}`);
    } catch (error) {
      setErro(error instanceof Error ? error.message : 'Erro ao criar reembolso');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            ← Voltar para Painel
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Novo Reembolso</h1>
        </div>

        {erro && (
          <div className="mb-4 p-4 bg-red-100 text-red-800 rounded">
            {erro}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">DATA *</label>
              <input
                type="date"
                name="data"
                value={formData.data}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">PROCESSO</label>
              <input
                type="text"
                name="processo"
                value={formData.processo}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">UPM</label>
              <input
                type="text"
                name="upm"
                value={formData.upm}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">BENEFICIÁRIO</label>
              <input
                type="text"
                name="beneficiario"
                value={formData.beneficiario}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">REQUERENTE</label>
              <input
                type="text"
                name="requerente"
                value={formData.requerente}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">SOLICITADO</label>
              <input
                type="number"
                name="solicitado"
                value={formData.solicitado}
                onChange={handleChange}
                step="0.01"
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CPF TITULAR</label>
              <input
                type="text"
                name="cpfTitular"
                value={formData.cpfTitular}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">DISTRIBUIÇÃO</label>
              <input
                type="date"
                name="distribuicao"
                value={formData.distribuicao}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CONFORMIDADE</label>
              <input
                type="date"
                name="conformidade"
                value={formData.conformidade}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">PEG</label>
              <input
                type="text"
                name="peg"
                value={formData.peg}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ESPECIALIDADE</label>
              <input
                type="text"
                name="especialidade"
                value={formData.especialidade}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">DECISÃO</label>
              <input
                type="text"
                name="decisao"
                value={formData.decisao}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">RESULTADO</label>
              <input
                type="text"
                name="resultado"
                value={formData.resultado}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">PAGAMENTO</label>
              <input
                type="date"
                name="pagamento"
                value={formData.pagamento}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ATRIBUIDO</label>
              <input
                type="text"
                name="atribuido"
                value={formData.atribuido}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">OB (Observação)</label>
            <textarea
              name="ob"
              value={formData.ob}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border rounded"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              disabled={carregando}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              {carregando ? 'Salvando...' : 'Salvar'}
            </button>
            <Link
              href="/"
              className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

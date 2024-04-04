<?

namespace App\Services\BigCommerce;

use Illuminate\Support\Facades\Http;

class CreateUserService
{
    public function createUser($userData)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json',
            'X-Auth-Token' => 'j1kgg3t937z28srzikguf8dniv4d5y0',
        ])->post('https://api.bigcommerce.com/stores/1abwowmljz/v3/customers', $userData);
        dd($response);
        return $response->json();
    }
}

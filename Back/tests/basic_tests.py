from django.test import TestCase


class AbstractBasicTests(TestCase):
    JSON_FILE: str = "application/json"
    HTML_FILE: str = "text/html"
    XML_FILE: str = "text/xml"

    # * * * * * * * * * * * * * tests 200 * * * * * * * * * * * * * * *
    def basic_test_get_url_status_200(self, test_url: str):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, 200)

    def basic_test_post_url_status_200(self, test_url: str, request_data: dict):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 200)

    def basic_test_put_url_status_200(self, test_url: str, request_data: dict):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 200)

    def basic_test_patch_url_status_200(self, test_url: str, request_data: dict):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 200)

    def basic_test_delete_url_status_200(self, test_url: str):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, 200)

    # * * * * * * * * * * * * * tests 201 * * * * * * * * * * * * * * *
    def basic_test_post_url_status_201(self, test_url: str, request_data: dict):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 201)

    # * * * * * * * * * * * * * tests 300 * * * * * * * * * * * * * * *
    def basic_test_get_url_status_300_error(self, test_url: str):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, 300)

    def basic_test_post_url_status_300_error(self, test_url: str, request_data: dict):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 300)

    def basic_test_put_url_status_300_error(self, test_url: str, request_data: dict):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 300)

    def basic_test_patch_url_status_300_error(self, test_url: str, request_data: dict):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 300)

    def basic_test_delete_url_status_300_error(self, test_url: str):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, 300)

    def basic_test_get_post_url_300_error(self, test_url: str, request_data: dict):
        self.basic_test_get_url_status_300_error(test_url)
        self.basic_test_post_url_status_300_error(test_url, request_data)

    def basic_test_post_patch_delete_url_300_error(self, test_url: str, request_data: dict):
        self.basic_test_patch_url_status_300_error(test_url, request_data)
        self.basic_test_delete_url_status_300_error(test_url)

    # * * * * * * * * * * * * * tests 400 * * * * * * * * * * * * * * *
    def basic_test_get_url_status_400_error(self, test_url: str):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, 400)

    def basic_test_post_url_status_400_error(self, test_url: str, request_data: dict):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def basic_test_put_url_status_400_error(self, test_url: str, request_data: dict):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def basic_test_patch_url_status_400_error(self, test_url: str, request_data: dict):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 400)

    def basic_test_delete_url_status_400_error(self, test_url: str):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, 400)

    def basic_test_get_post_url_400_error(self, test_url: str, request_data: dict):
        self.basic_test_get_url_status_400_error(test_url)
        self.basic_test_post_url_status_400_error(test_url, request_data)

    def basic_test_post_patch_delete_url_400_error(self, url, request_data):
        self.basic_test_patch_url_status_400_error(url, request_data)
        self.basic_test_delete_url_status_400_error(url)

    # * * * * * * * * * * * * * tests 401 * * * * * * * * * * * * * * *
    def basic_test_get_url_status_401_error(self, test_url: str):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, 401)

    def basic_test_post_url_status_401_error(self, test_url: str, request_data: dict):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 401)

    def basic_test_put_url_status_401_error(self, test_url: str, request_data: dict):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 401)

    def basic_test_patch_url_status_401_error(self, test_url: str, request_data: dict):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 401)

    def basic_test_delete_url_status_401_error(self, test_url: str):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, 401)

    def basic_test_get_post_url_401_error(self, test_url: str, request_data: dict):
        self.basic_test_get_url_status_401_error(test_url)
        self.basic_test_post_url_status_401_error(test_url, request_data)

    def basic_test_post_patch_delete_url_401_error(self, test_url: str, request_data: dict):
        self.basic_test_patch_url_status_401_error(test_url, request_data)
        self.basic_test_delete_url_status_401_error(test_url)

    # * * * * * * * * * * * * * * * No token 403 error * * * * * * * * * * * * * * *
    def basic_test_get_url_no_token_403_error(self, test_url: str):
        self.client.cookies['token'] = ""
        self.basic_test_get_url_status(test_url, 403)

    def basic_test_post_url_no_token_403_error(self, test_url: str, request_data: dict):
        self.client.cookies['token'] = ""
        self.basic_test_post_url_status(test_url, request_data, 403)

    def basic_test_put_url_no_token_403_error(self, test_url: str, request_data: dict):
        self.client.cookies['token'] = ""
        self.basic_test_put_url_status(test_url, request_data, 403)

    def basic_test_patch_url_no_token_403_error(self, test_url: str, request_data: dict):
        self.client.cookies['token'] = ""
        self.basic_test_patch_url_status(test_url, request_data, 403)

    def basic_test_delete_url_no_token_403_error(self, test_url: str):
        self.client.cookies['token'] = ""
        self.basic_test_delete_url_status(test_url, 403)

    def basic_test_get_post_url_no_token_403_error(self, test_url: str, request_data: dict):
        self.client.cookies['token'] = ""
        self.basic_test_get_url_no_token_403_error(test_url)
        self.basic_test_post_url_no_token_403_error(test_url, request_data)

    def basic_test_patch_delete_url_no_token_403_error(self, test_url: str, request_data: dict):
        self.client.cookies['token'] = ""
        self.basic_test_patch_url_no_token_403_error(test_url, request_data)
        self.basic_test_delete_url_no_token_403_error(test_url)

    def basic_test_patch_put_delete_url_no_token_403_error(self, test_url: str, request_data: dict):
        self.client.cookies['token'] = ""
        self.basic_test_patch_url_no_token_403_error(test_url, request_data)
        self.basic_test_put_url_no_token_403_error(test_url, request_data)
        self.basic_test_delete_url_no_token_403_error(test_url)

    # * * * * * * * * * * * * * tests 404 * * * * * * * * * * * * * * *
    def basic_test_get_url_status_404_error(self, test_url: str):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, 404)

    def basic_test_post_url_status_404_error(self, test_url: str, request_data: dict):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 404)

    def basic_test_put_url_status_404_error(self, test_url: str, request_data: dict):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 404)

    def basic_test_patch_url_status_404_error(self, test_url: str, request_data: dict):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 404)

    def basic_test_delete_url_status_404_error(self, test_url: str):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, 404)

    def basic_test_get_post_url_404_error(self, test_url: str, request_data: dict):
        self.basic_test_get_url_status_404_error(test_url)
        self.basic_test_post_url_status_404_error(test_url, request_data)

    def basic_test_post_patch_delete_url_404_error(self, test_url: str, request_data: dict):
        self.basic_test_patch_url_status_404_error(test_url, request_data)
        self.basic_test_delete_url_status_404_error(test_url)

    # * * * * * * * * * * * * * tests 405 * * * * * * * * * * * * * * *
    def basic_test_get_url_status_405_error(self, test_url: str):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, 405)

    def basic_test_post_url_status_405_error(self, test_url: str, request_data: dict):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 405)

    def basic_test_put_url_status_405_error(self, test_url: str, request_data: dict):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 405)

    def basic_test_patch_url_status_405_error(self, test_url: str, request_data: dict):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 405)

    def basic_test_delete_url_status_405_error(self, test_url: str):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, 405)

    def basic_test_get_post_url_405_error(self, test_url: str, request_data: dict):
        self.basic_test_get_url_status_405_error(test_url)
        self.basic_test_post_url_status_405_error(test_url, request_data)

    def basic_test_post_patch_delete_url_405_error(self, test_url: str, request_data: dict):
        self.basic_test_patch_url_status_405_error(test_url, request_data)
        self.basic_test_delete_url_status_405_error(test_url)

    # * * * * * * * * * * * * * tests 500 * * * * * * * * * * * * * * *
    def basic_test_get_url_status_500_error(self, test_url: str):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, 500)

    def basic_test_post_url_status_500_error(self, test_url: str, request_data: dict):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 500)

    def basic_test_put_url_status_500_error(self, test_url: str, request_data: dict):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 500)

    def basic_test_patch_url_status_500_error(self, test_url: str, request_data: dict):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 500)

    def basic_test_delete_url_status_500_error(self, test_url: str):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, 500)

    def basic_test_get_post_url_500_error(self, test_url: str, request_data: dict):
        self.basic_test_get_url_status_500_error(test_url)
        self.basic_test_post_url_status_500_error(test_url, request_data)

    def basic_test_post_patch_delete_url_500_error(self, test_url: str, request_data: dict):
        self.basic_test_patch_url_status_500_error(test_url, request_data)
        self.basic_test_delete_url_status_500_error(test_url)

    # * * * * * * * * * * * * * tests 503 Service Unavailable * * * * * * * * * * * * * * *
    def basic_test_get_url_status_503_error(self, test_url: str):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, 503)

    def basic_test_post_url_status_503_error(self, test_url: str, request_data: dict):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 503)

    def basic_test_put_url_status_503_error(self, test_url: str, request_data: dict):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 503)

    def basic_test_patch_url_status_503_error(self, test_url: str, request_data: dict):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, 503)

    def basic_test_delete_url_status_503_error(self, test_url: str):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, 503)

    def basic_test_get_post_url_503_error(self, test_url: str, request_data: dict):
        self.basic_test_get_url_status_503_error(test_url)
        self.basic_test_post_url_status_503_error(test_url, request_data)

    def basic_test_post_patch_delete_url_503_error(self, test_url: str, request_data: dict):
        self.basic_test_patch_url_status_503_error(test_url, request_data)
        self.basic_test_delete_url_status_503_error(test_url)

    # * * * * * * * * * * * * *  Basic url access tests * * * * * * * * * * * * * * *
    def basic_test_get_url_status(self, test_url, status):
        response = self.client.get(test_url)
        self.assertEqual(response.status_code, status)

    def basic_test_post_url_status(self, test_url, request_data, status):
        response = self.client.post(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, status)

    def basic_test_put_url_status(self, test_url, request_data, status):
        response = self.client.put(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, status)

    def basic_test_patch_url_status(self, test_url, request_data, status):
        response = self.client.patch(test_url, request_data, format='multipart')
        self.assertEqual(response.status_code, status)

    def basic_test_delete_url_status(self, test_url, status):
        response = self.client.delete(test_url)
        self.assertEqual(response.status_code, status)

    # * * * * * * * * * * * * *  Compare content type json tests * * * * * * * * * * * * * * *
    def basic_test_get_url_compare_content_type_json(self, test_url):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_get_url_compare_content_type(test_url, self.JSON_FILE)

    def basic_test_post_url_compare_content_type_json(self, test_url, request_data):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_post_url_compare_content_type(test_url, request_data, self.JSON_FILE)

    def basic_test_patch_url_compare_content_type_json(self, test_url, request_data):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_patch_url_compare_content_type(test_url, request_data, self.JSON_FILE)

    def basic_test_put_url_compare_content_type_json(self, test_url, request_data):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_put_url_compare_content_type(test_url, request_data, self.JSON_FILE)

    def basic_test_delete_url_compare_content_type_json(self, test_url):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_delete_url_compare_content_type(test_url, self.JSON_FILE)

    # * * * * * * * * * * * * *  Compare content type html tests * * * * * * * * * * * * * * *
    def basic_test_get_url_compare_content_type_html(self, test_url):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_get_url_compare_content_type(test_url, self.HTML_FILE)

    def basic_test_post_url_compare_content_type_html(self, test_url, request_data):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_post_url_compare_content_type(test_url, request_data, self.HTML_FILE)

    def basic_test_patch_url_compare_content_type_html(self, test_url, request_data):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_patch_url_compare_content_type(test_url, request_data, self.HTML_FILE)

    def basic_test_put_url_compare_content_type_html(self, test_url, request_data):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_put_url_compare_content_type(test_url, request_data, self.HTML_FILE)

    def basic_test_delete_url_compare_content_type_html(self, test_url):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_delete_url_compare_content_type(test_url, self.HTML_FILE)

    # * * * * * * * * * * * * *  Compare content type html tests * * * * * * * * * * * * * * *
    def basic_test_get_url_compare_content_type_xml(self, test_url):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_get_url_compare_content_type(test_url, self.XML_FILE)

    def basic_test_post_url_compare_content_type_xml(self, test_url, request_data):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_post_url_compare_content_type(test_url, request_data, self.XML_FILE)

    def basic_test_patch_url_compare_content_type_xml(self, test_url, request_data):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_patch_url_compare_content_type(test_url, request_data, self.XML_FILE)

    def basic_test_put_url_compare_content_type_xml(self, test_url, request_data):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_put_url_compare_content_type(test_url, request_data, self.XML_FILE)

    def basic_test_delete_url_compare_content_type_xml(self, test_url):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        self.basic_test_delete_url_compare_content_type(test_url, self.XML_FILE)

    # * * * * * * * * * * * * *  Compare content type tests * * * * * * * * * * * * * * *
    def basic_test_get_url_compare_content_type(self, test_url, content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.get(test_url)
        self.compare_content_type(response, content_type)

    def basic_test_post_url_compare_content_type(self, test_url, request_data, content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.post(test_url, request_data, format='multipart')
        self.compare_content_type(response, content_type)

    def basic_test_patch_url_compare_content_type(self, test_url, request_data, content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.patch(test_url, request_data, format='multipart')
        self.compare_content_type(response, content_type)

    def basic_test_put_url_compare_content_type(self, test_url, request_data, content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.put(test_url, request_data, format='multipart')
        self.compare_content_type(response, content_type)

    def basic_test_delete_url_compare_content_type(self, test_url, content_type):
        """ Verifica se o tipo da resposta é igual ao fornecido """
        response = self.client.delete(test_url)
        self.compare_content_type(response, content_type)

    def compare_content_type(self, response, content_type):
        """ Função que compara os tipos dos conteúdos do response (usado varias vezes) """
        try:
            content = response['Content-Type']

        except KeyError:
            content = None

        self.assertEqual(content, content_type)

    # * * * * * * * * * * * * *  Compare content value tests * * * * * * * * * * * * * * *
    def basic_test_get_url_compare_response_content(self, test_url, json_content):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.get(test_url)
        self.compare_content_value(response, json_content)

    def basic_test_post_url_compare_response_content(self, test_url, request_data, json_content):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.post(test_url, request_data, format='multipart')
        self.compare_content_value(response, json_content)

    def basic_test_patch_url_compare_response_content(self, test_url, request_data, json_content):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.patch(test_url, request_data, format='multipart')
        self.compare_content_value(response, json_content)

    def basic_test_put_url_compare_response_content(self, test_url, request_data, json_content):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.put(test_url, request_data, format='multipart')
        self.compare_content_value(response, json_content)

    def basic_test_delete_url_compare_response_content(self, test_url, json_content):
        """ Verifica se o conteúdo da  resposta é igual ao fornecido """
        response = self.client.delete(test_url)
        self.compare_content_value(response, json_content)

    def compare_content_value(self, response, json_content):
        """ Função que compara os conteúdos do response (usado varias vezes) """
        try:
            result = response.json()
            print(result)

        except TypeError:
            result = None

        self.assertEqual(result, json_content)

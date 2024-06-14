from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import argostranslate.package
import argostranslate.translate
import os

class classTranslate(BaseHTTPRequestHandler):
    def do_GET(self):
        html = """
        <!DOCTYPE html>
        <html>
            <body>
                <h1>hola papu fresco</h1>
            </body>
        </html>
        """
        self.send_response(200)
        self.send_header('Content-type', 'text/html')
        self.end_headers()
        self.wfile.write(html.encode('utf-8'))

    def do_POST(self):
        if self.path == '/traductor':
            try:
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                to_translate = json.loads(post_data.decode('utf-8'))

                # Load and install translation packages if not already installed
                available_packages = argostranslate.package.get_available_packages()
                package_to_install = next(
                    (pkg for pkg in available_packages if pkg.from_code == to_translate["from_code"] and pkg.to_code == to_translate["to_code"]), 
                    None
                )

                if package_to_install is not None:
                    package_path = package_to_install.download()
                    argostranslate.package.install_from_path(package_path)

                # Perform the translation
                translated_text = argostranslate.translate.translate(
                    to_translate["text"], to_translate["from_code"], to_translate["to_code"]
                )

                # Prepare the response
                response = {
                    'translated_text': translated_text
                }

                self.send_response(201)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps(response).encode('utf-8'))

            except Exception as e:
                # Handle errors and respond with an appropriate message
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {
                    'error': str(e)
                }
                self.wfile.write(json.dumps(response).encode('utf-8'))

# Server configuration
server_address = '0.0.0.0'
server_port = 3000

httpd = HTTPServer((server_address, server_port), classTranslate)
print(f"Server running at http://{server_address}:{server_port}/")
httpd.serve_forever()


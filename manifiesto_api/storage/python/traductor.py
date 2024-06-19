import sys
import argostranslate.package
import argostranslate.translate

def main():
    if len(sys.argv) < 4:
        print("Usage: python script.py from_code to_code text_to_translate")
        return

    from_code = sys.argv[1]
    to_code = sys.argv[2]
    text_to_translate = sys.argv[3]

    # Download and install Argos Translate package if necessary
    argostranslate.package.update_package_index()
    available_packages = argostranslate.package.get_available_packages()
    
    # Find the package corresponding to from_code and to_code
    package_to_install = next(
        filter(
            lambda x: x.from_code == from_code and x.to_code == to_code, available_packages
        ),
        None
    )
    
    if package_to_install is None:
        print(f"No translation package available for {from_code} to {to_code}")
        return
    
    # Install the package
    argostranslate.package.install_from_path(package_to_install.download())

    # Perform translation
    translated_text = argostranslate.translate.translate(text_to_translate, from_code, to_code)
    print(translated_text)

if __name__ == "__main__":
    main()


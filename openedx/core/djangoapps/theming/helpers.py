"""
    Helpers for accessing comprehensive theming related variables.
"""
import logging

from django.conf import settings

from microsite_configuration import microsite
from microsite_configuration import page_title_breadcrumbs

logger = logging.getLogger(__name__)


def get_page_title_breadcrumbs(*args):
    """
    This is a proxy function to hide microsite_configuration behind comprehensive theming.
    """
    return page_title_breadcrumbs(*args)


def get_value(val_name, default=None, **kwargs):
    """
    This is a proxy function to hide microsite_configuration behind comprehensive theming.
    """
    # Attempt to retrieve the requested field/value from the microsite configuration
    microsite_value = microsite.get_value(val_name, default=default, **kwargs)

    # If we received a non-dictionary value from the microsite config workflow, return it immediately.
    if not isinstance(microsite_value, dict):
        return microsite_value

    # Load the default configuration value so we can take a closer look
    if not default:
        default_dict = getattr(settings, val_name)
    else:
        default_dict = default

    # If the default value is not a dictionary, something fishy is going on...
    if not isinstance(default_value, dict):
        msg = "Type for microsite setting '{name}' does not match the base setting type.".format(name=val_name)
        logger.warn(msg)
        return microsite_value

    # We have two dicts at this point, so override some/all of the default dictionary
    # with the microsite configuration dictionary's fields+values
    override_dict = dict(default_dict)
    return override_dict.update(microsite_value)


def get_template_path(relative_path, **kwargs):
    """
    This is a proxy function to hide microsite_configuration behind comprehensive theming.
    """
    return microsite.get_template_path(relative_path, **kwargs)


def is_request_in_themed_site():
    """
    This is a proxy function to hide microsite_configuration behind comprehensive theming.
    """
    return microsite.is_request_in_microsite()


def get_themed_template_path(relative_path, default_path, **kwargs):
    """
    This is a proxy function to hide microsite_configuration behind comprehensive theming.

    The workflow considers the "Stanford theming" feature alongside of microsites.  It returns
    the path of the themed template (i.e. relative_path) if Stanford theming is enabled AND
    microsite theming is disabled, otherwise it will return the path of either the microsite
    override template or the base lms template.

    :param relative_path: relative path of themed template
    :param default_path: relative path of the microsite's or lms template to use if
        theming is disabled or microsite is enabled
    """
    is_stanford_theming_enabled = settings.FEATURES.get("USE_CUSTOM_THEME", False)
    is_microsite = microsite.is_request_in_microsite()
    if is_stanford_theming_enabled and not is_microsite:
        return relative_path
    return microsite.get_template_path(default_path, **kwargs)

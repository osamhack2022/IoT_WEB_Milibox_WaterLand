# Generated by Django 4.1.2 on 2022-10-28 08:00

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_alter_permission_allowed_user'),
    ]

    operations = [
        migrations.RenameField(
            model_name='permission',
            old_name='record_id',
            new_name='record',
        ),
    ]